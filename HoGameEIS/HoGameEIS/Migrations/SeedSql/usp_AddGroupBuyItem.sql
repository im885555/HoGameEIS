-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150820>
-- Description:	<團購新增訂購項目>
-- BUZ:
-- 新增項目必定包含一子項
-- =============================================
CREATE PROCEDURE [dbo].[usp_AddGroupBuyItem]
	@GroupBuyId int
AS
BEGIN
	DECLARE @ItemID int 

	BEGIN TRANSACTION 
	INSERT INTO [dbo].[GroupBuyItems]
			   ([ItemName],
			   [GroupBuyId])
		 VALUES
			   (N'',@GroupBuyId)

	SELECT @itemID =SCOPE_IDENTITY() 
	INSERT INTO [dbo].[GroupBuySubItems]
			   ([SubItemName],
			   [Price],
			   [ItemId])
		 VALUES
			   (N'',
			   0,
			   @ItemID)
	COMMIT TRANSACTION
END

