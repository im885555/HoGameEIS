-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150826>
-- Description:	<團購更換店家>
-- BUZ:
-- 刪除原本團購店家數據後 重新匯入新店家數據
-- =============================================
CREATE PROCEDURE [dbo].[usp_ChangeGroupBuyStore]
	@StoreId int,
	@GroupBuyId int
AS
BEGIN
	DECLARE 
	@StoreName nvarchar(255),
	@Address nvarchar(255),
	@Tel nvarchar(255),
	@Memo nvarchar(255)



	--刪除原本團購店家數據
	DELETE [dbo].[GroupBuySubscribers]
	WHERE SubItemId 
	in ( 
		SELECT SubItemId FROM [dbo].[GroupBuySubItems]
		WHERE ItemId 
		in(
			SELECT ItemId FROM [dbo].[GroupBuyItems]
			WHERE GroupBuyId = @GroupBuyId
		)
	)

	DELETE [dbo].[GroupBuySubItems] 
	WHERE  [ItemId] IN 
	(
		SELECT [ItemId] FROM [dbo].[GroupBuyItems] 
		WHERE GroupBuyId = @GroupBuyId
	)
	DELETE [dbo].[GroupBuyItems]  WHERE GroupBuyId = @GroupBuyId

	DELETE [dbo].[GroupBuyMenuImages] WHERE GroupBuyId = @GroupBuyId

	--更新團購店家資料
	SELECT 
	@StoreName=StoreName,
	@Address=[Address],
	@Tel=Tel,
	@Memo=Memo
	FROM [dbo].[GroupBuyStores]
	WHERE StoreId= @StoreId

	UPDATE [dbo].[GroupBuys] 
	SET [StoreId] = @StoreId,
	[StoreName] = @StoreName,
	[Address] = @Address,
	[Tel] = @Tel,
	[Memo] = @Memo
	WHERE GroupBuyId = @GroupBuyId


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
