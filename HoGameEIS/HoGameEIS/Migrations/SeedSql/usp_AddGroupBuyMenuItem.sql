-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<團購新增菜單項目>
-- BUZ:
-- 新增項目必定包含一子項
-- =============================================
CREATE PROCEDURE [dbo].[usp_AddGroupBuyMenuItem]
	@StoreId int
AS
BEGIN
	DECLARE @ItemID int 

	BEGIN TRANSACTION 
	INSERT INTO [dbo].[GroupBuyStoreItems]
			   ([ItemName],
			   [StoreId])
		 VALUES
			   (N'新項目',@StoreId)

	SELECT @itemID =SCOPE_IDENTITY() 
	INSERT INTO [dbo].[GroupBuyStoreSubItems]
			   ([SubItemName],
			   [Price],
			   [ItemId])
		 VALUES
			   (N'子項',
			   0,
			   @ItemID)
	COMMIT TRANSACTION
END

