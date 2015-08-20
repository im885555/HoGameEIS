-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<團購刪除菜單子項目>
-- BUZ:
-- 刪除菜單子項目後，檢查是否已無其他兄弟項目。
-- 如果沒有就刪除父項目。
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteGroupBuyMenuSubItem]
	@SubItemId int
AS
BEGIN
	DECLARE 
	@SubItemCount int,
	@ItemID int

	SELECT TOP 1 @ItemID = ItemId FROM [dbo].[GroupBuyStoreSubItems]
	WHERE SubItemId=@SubItemId

	DELETE FROM [dbo].[GroupBuyStoreSubItems] WHERE SubItemId=@SubItemId

	SELECT @SubItemCount = COUNT(SubItemId)  FROM [dbo].[GroupBuyStoreSubItems] 
	WHERE ItemId =@ItemID

	SELECT @SubItemCount
	IF  @SubItemCount=0
	BEGIN
	DELETE FROM [dbo].[GroupBuyStoreItems] WHERE ItemId=@ItemId
	END
END

