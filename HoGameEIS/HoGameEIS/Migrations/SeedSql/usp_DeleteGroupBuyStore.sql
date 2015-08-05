-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<團購刪除店家資料>
-- BUZ:
-- 刪除店家資料一併刪除所有菜單資料
-- =============================================
CREATE PROCEDURE [dbo].[usp_DeleteGroupBuyStore]
	@StoreId int
AS
BEGIN
	DELETE FROM [dbo].[GroupBuyStoreSubItems]
	where ItemId 
	IN(
	SELECT ItemId  FROM [dbo].[GroupBuyStoreItems]
	WHERE StoreId = @StoreId
	)

	DELETE FROM [dbo].[GroupBuyStoreItems]
	WHERE StoreId = @StoreId

	DELETE FROM [dbo].[GroupBuyStores]
	WHERE StoreId = @StoreId
END

