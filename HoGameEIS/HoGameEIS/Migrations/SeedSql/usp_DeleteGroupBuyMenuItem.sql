-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<團購刪除菜單項目>
-- BUZ:
-- 刪除菜單項目一併刪除所有子項目
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteGroupBuyMenuItem]
	@ItemId int
AS
BEGIN
	DELETE FROM [dbo].[GroupBuyStoreSubItems] WHERE ItemId=  @ItemId 
	DELETE FROM [dbo].[GroupBuyStoreItems] WHERE ItemId=  @ItemId 
END

