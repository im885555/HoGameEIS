-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150812>
-- Description:	<新增團購>
-- BUZ:
-- 匯入店家與菜單數據 產生一組團購數據
-- =============================================
CREATE PROCEDURE [dbo].[usp_AddGroupBuy]
	@StoreId int,
	@Description nvarchar(max),
	@EndTime datetime,
	@Creator int
AS
BEGIN
	DECLARE @GroupBuyId int
	
	--產生團購主檔數據
	INSERT INTO [dbo].[GroupBuys]
			   ([Description],
			   [StartTime],
			   [EndTime],
			   [StoreId],
			   [Creator])
		 VALUES
			   (@Description,
			   CURRENT_TIMESTAMP,
			   @EndTime,
			   @StoreId,
			   @Creator)
    SELECT @GroupBuyId = SCOPE_IDENTITY() 

	DECLARE @TempTable TABLE(ItemId int)
	INSERT INTO @TempTable
	SELECT ItemId FROM GroupBuyStoreItems
	WHERE StoreId=@StoreId

    DECLARE ItemId_Cursor CURSOR FOR
	SELECT ItemId FROM @TempTable

	OPEN ItemId_Cursor
	DECLARE @ItemId int
	    
    FETCH NEXT FROM ItemId_Cursor
	into @ItemId
	
	WHILE(@@FETCH_STATUS=0) 
	BEGIN

	BEGIN TRANSACTION 

	--匯入菜單項目
	INSERT INTO [dbo].[GroupBuyItems]
			   (ItemName,GroupBuyId)
	SELECT ItemName,@GroupBuyId FROM [dbo].GroupBuyStoreItems
	WHERE ItemId=@ItemId

	DECLARE @NewItemId int
	SELECT @NewItemId = SCOPE_IDENTITY() 

	--匯入菜單子項目
	INSERT INTO [dbo].[GroupBuySubItems]
			   ([SubItemName],
			   [Price],
			   [ItemId])
	SELECT SubItemName,Price,@NewItemId FROM [dbo].GroupBuyStoreSubItems
	WHERE ItemId=@ItemId
		
	COMMIT TRANSACTION

	FETCH NEXT from ItemId_Cursor
	into @ItemId 
	END
    
	CLOSE ItemId_Cursor  
	DEALLOCATE ItemId_Cursor 

	--匯入菜單照片
	INSERT INTO [dbo].[GroupBuyMenuImages]
	(ImageUrl,GroupBuyId)
    SELECT ImageUrl,@GroupBuyId FROM [dbo].GroupBuyStoreMenuImages
	WHERE StoreId =@StoreId
END
