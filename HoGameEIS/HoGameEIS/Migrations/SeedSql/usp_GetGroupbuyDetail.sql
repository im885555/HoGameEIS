-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150812>
-- Description:	<取得團購細目>
-- BUZ:
-- 輸入團購編號 取得團購細目
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetGroupbuyDetail]
  @GroupBuyId int
AS
BEGIN	
	SELECT 
	a.[GroupBuyId],
	a.[Description],
	a.[StartTime],
	a.[EndTime],
	a.[Creator],
	e.[FullName] as [CreatorName],
	a.[StoreId],
	a.[StoreName],
	a.[Tel],
	a.[Address],
	a.[Memo],
	CAST(CASE WHEN a.[EndTime]>GETDATE() THEN 'ongoing' ELSE 'closed' END as char(10)) as [Status]
	FROM [dbo].[GroupBuys] a, [dbo].[Employees] e
	WHERE e.EmployeeId=a.Creator
	AND a.[GroupBuyId]=@GroupBuyId
END
