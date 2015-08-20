-- =============================================
-- Author:		<Gene.Chen>
-- Create date: <20150803>
-- Description:	<卸載PROCEDURE>
-- =============================================
IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_AddGroupBuyMenuItem')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_AddGroupBuyMenuItem]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_DeleteGroupBuyMenuSubItem')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_DeleteGroupBuyMenuSubItem]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_DeleteGroupBuyMenuItem')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_DeleteGroupBuyMenuItem]


IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_DeleteGroupBuyStore')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_DeleteGroupBuyStore]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_AddGroupBuy')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_AddGroupBuy]


IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_GetGroupbuyList')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_GetGroupbuyList]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_GetGroupbuyDetail')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_GetGroupbuyDetail]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_AddGroupBuyItem')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_AddGroupBuyItem]

IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_AddGroupBuySubscriber')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_AddGroupBuySubscriber]


IF EXISTS ( SELECT  *
            FROM    sys.objects
            WHERE   object_id = OBJECT_ID(N'usp_CancelGroupBuySubscriber')
                    AND type IN ( N'P', N'PC' )) 
DROP  PROCEDURE [dbo].[usp_CancelGroupBuySubscriber]
