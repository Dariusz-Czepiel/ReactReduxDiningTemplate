--init users
--add by hand admin@email.com ADMIN
--add by hand manager@email.com MANAGER
--add by hand user@email.com USER

--init roles

insert into [DiningTemplate].[dbo].[AspNetRoles](Id, [Name], NormalizedName) VALUES ('Admin', 'Admin', 'ADMIN')
insert into [DiningTemplate].[dbo].[AspNetRoles](Id, [Name], NormalizedName) VALUES ('Manager', 'Manager', 'MANAGER')
insert into [DiningTemplate].[dbo].[AspNetRoles](Id, [Name], NormalizedName) VALUES ('User', 'User', 'USER')

--init user roles
insert into [DiningTemplate].[dbo].[AspNetUserRoles] VALUES (admin@email.com id, 'Admin')
insert into [DiningTemplate].[dbo].[AspNetUserRoles] VALUES (manager@email.com id, 'Manager')
insert into [DiningTemplate].[dbo].[AspNetUserRoles] VALUES (user@email.com id, 'User')