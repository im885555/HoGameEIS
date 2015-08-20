-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150820>
-- Description:	<團購使用者取消下訂>
-- BUZ:
-- 使用者取消下訂 如有兩筆以上訂購 數量減一 如數量只剩一筆直接刪除
-- =============================================
CREATE PROCEDURE [dbo].[usp_CancelGroupBuySubscriber]
	@EmployeeId int,
	@SubItemId int
AS
BEGIN
	BEGIN TRANSACTION 
	DECLARE @Amount int
	SET @Amount = 0 
	SELECT @Amount=[Amount] FROM [dbo].[GroupBuySubscribers] 
		WHERE EmployeeId= @EmployeeId AND SubItemId =@SubItemId

	IF (@Amount>0)
	BEGIN
		IF (@Amount> 1) 
			UPDATE [dbo].[GroupBuySubscribers] 
			SET Amount=Amount-1 
			WHERE EmployeeId= @EmployeeId AND SubItemId =@SubItemId
		ELSE
			DELETE [dbo].[GroupBuySubscribers] 
			WHERE EmployeeId= @EmployeeId AND SubItemId =@SubItemId
	END	
	COMMIT TRANSACTION
END