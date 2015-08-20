-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150812>
-- Description:	<取得團購清單>
-- BUZ:
-- 取得當前/結束團購清單 
-- =============================================
CREATE PROCEDURE [dbo].[usp_GetGroupbuyList]
  @isOngoing bit
AS
BEGIN
	IF @isOngoing =1
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
			'ongoing' as [Status]
			FROM [dbo].[GroupBuys] a, [dbo].[Employees] e
			WHERE e.EmployeeId=a.Creator
			AND a.EndTime>GETDATE ( )
			ORDER BY a.[StartTime] DESC
	END
	ELSE
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
			'closed' as [Status]
			FROM [dbo].[GroupBuys] a, [dbo].[Employees] e
			WHERE e.EmployeeId=a.Creator
			AND a.EndTime<GETDATE ( )
			ORDER BY a.[StartTime] DESC

END