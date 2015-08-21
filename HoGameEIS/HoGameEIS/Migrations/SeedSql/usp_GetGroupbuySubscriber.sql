-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150812>
-- Description:	<取得團購訂購明細>
-- BUZ:
-- 輸入團購編號 與員工編號  取得團購訂購明細
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetGroupbuySubscriber]
  @GroupBuyId int,
  @EmployeeId int
AS
BEGIN	
	SELECT 
	i.ItemName,
	s.SubItemName,
	a.Amount
	FROM [dbo].[GroupBuySubscribers] a, 
	[dbo].[GroupBuySubItems] s,
	[dbo].[GroupBuyItems] i
	WHERE i.ItemId= s.ItemId 
	AND s.SubItemId=a.SubItemId 
	AND i.GroupBuyId=@GroupBuyId 
	AND a.EmployeeId=@EmployeeId

END
