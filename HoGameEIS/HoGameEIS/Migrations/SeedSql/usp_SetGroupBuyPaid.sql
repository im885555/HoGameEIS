-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150820>
-- Description:	<團購已繳費金額設定>
-- BUZ:
-- 團購已繳費金額設定
-- =============================================
CREATE PROCEDURE [dbo].[usp_SetGroupBuyPaid]
	@EmployeeId int,
	@GroupBuyId int,
	@Paid int
AS
BEGIN
	IF(@Paid=0)
		BEGIN
			DELETE [dbo].[GroupBuyPaids] 
			WHERE  EmployeeId= @EmployeeId AND GroupBuyId = @GroupBuyId
		END
    ELSE
		BEGIN
			IF EXISTS 
			(
				SELECT * FROM [dbo].[GroupBuyPaids] 
				WHERE EmployeeId= @EmployeeId AND GroupBuyId = @GroupBuyId
			)

				UPDATE [dbo].[GroupBuyPaids] 
				SET Paid=@Paid
				WHERE  EmployeeId= @EmployeeId AND GroupBuyId = @GroupBuyId
			ELSE
				INSERT INTO [dbo].[GroupBuyPaids] 
				(
				[EmployeeId],
				[Paid],
				[GroupBuyId]
				)
				VALUES
				(
				@EmployeeId,
				@Paid,
				@GroupBuyId
				)
		 END
END

