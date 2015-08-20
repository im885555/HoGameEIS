-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150820>
-- Description:	<團購使用者下訂>
-- BUZ:
-- 使用者下訂 尚未下訂就新增一筆數據 如果是第二次下訂 僅增加數量
-- =============================================
CREATE PROCEDURE [dbo].[usp_AddGroupBuySubscriber]
	@EmployeeId int,
	@SubItemId int
AS
BEGIN
	BEGIN TRANSACTION 
	IF EXISTS 
	(
		SELECT * FROM [dbo].[GroupBuySubscribers] 
		WHERE EmployeeId= @EmployeeId AND SubItemId =@SubItemId
	)

		UPDATE [dbo].[GroupBuySubscribers] 
		SET Amount=Amount+1 
		WHERE EmployeeId= @EmployeeId AND SubItemId =@SubItemId
	ELSE
		INSERT INTO [dbo].[GroupBuySubscribers] 
		([EmployeeId],
		[Amount],
		[SubItemId],
		[SubscriberName])
		SELECT @EmployeeId,1,@SubItemId,[FullName] 
		FROM  [dbo].[Employees] 
		WHERE EmployeeId=@EmployeeId
	COMMIT TRANSACTION
END

