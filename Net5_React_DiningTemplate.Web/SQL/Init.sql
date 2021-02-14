--init users?

--init roles

insert into [DiningTemplate].[dbo].[AspNetRoles](Id, [Name], NormalizedName) VALUES ('Admin', 'Admin', 'ADMIN')

--init user roles
insert into [DiningTemplate].[dbo].[AspNetUserRoles] VALUES ('33954827-b884-4bad-8514-46c2fded1a57', 'Admin')