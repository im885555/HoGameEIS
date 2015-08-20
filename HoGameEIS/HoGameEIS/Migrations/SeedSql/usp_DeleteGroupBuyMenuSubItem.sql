-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<團購刪除訂單子項目>
-- BUZ:
-- 刪除訂單子項目後，檢查是否已無其他兄弟項目。
-- 如果沒有就刪除父項目。
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteGroupBuyOrderSubItem]
	@SubItemId int
AS
BEGIN
	DECLARE 
	@SubItemCount int,
	@ItemID int

	SELECT TOP 1 @ItemID = ItemId FROM [dbo].[GroupBuySubItems]
	WHERE SubItemId=@SubItemId

	DELETE FROM [dbo].[GroupBuySubItems] WHERE SubItemId=@SubItemId

	SELECT @SubItemCount = COUNT(SubItemId)  FROM [dbo].[GroupBuySubItems] 
	WHERE ItemId =@ItemID

	SELECT @SubItemCount
	IF  @SubItemCount=0
	BEGIN
	DELETE FROM [dbo].[GroupBuyItems] WHERE ItemId=@ItemId
	END
END

