﻿-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150812>
-- Description:	<取得團購付款資訊>
-- BUZ:
-- 輸入團購編號 取得團購付款資訊
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetGroupbuyPaid]
  @GroupBuyId int
AS
BEGIN	
	  DECLARE @PayableTable Table
	  (
		 EmployeeId int,
		 EmployeeName nvarchar(255),
		 GroupBuyId int,
		 Payable int
	  ) 

	  INSERT INTO @PayableTable
	  SELECT 
	  a.EmployeeId ,
	  a.SubscriberName , 
	  i.GroupBuyId ,
	  SUM(s.Price)  as 'Payable' 
	  FROM [dbo].[GroupBuySubscribers] a, [dbo].[GroupBuySubItems] s, [dbo].[GroupBuyItems] i
	  WHERE i.ItemId= s.ItemId AND s.SubItemId=a.SubItemId AND i.GroupBuyId=@GroupBuyId 
	  GROUP BY a.EmployeeId, a.SubscriberName, i.GroupBuyId

	  SELECT 
	  a.EmployeeId ,
	  a.EmployeeName,
	  a.Payable,
	  ISNULL(p.Paid,0) as 'Paid'
	   FROM @PayableTable a Left JOIN [dbo].[GroupBuyPaids] p
	  ON  a.GroupBuyId =p.GroupBuyId 
	  Union
	  SELECT 
	  p.EmployeeId ,
	  e.FullName as 'EmployeeName',
	  ISNULL(a.Payable,0) as 'Payable',
	  ISNULL(p.Paid,0) as 'Paid'
	   FROM @PayableTable a RIGHT JOIN [dbo].[GroupBuyPaids] p
	  ON  a.GroupBuyId =p.GroupBuyId 
	  LEFT JOIN [dbo].[Employees] e 
	  ON e.EmployeeId=p.EmployeeId
	  WHERE p.GroupBuyId=@GroupBuyId

END
