-- CAUTION: This script deletes transactional data to reset the system for production.
-- It keeps your Registered Users intact so you don't lose your admin accounts.

-- 1. Wipe all submissions / assets
DELETE FROM donations;

-- 2. Wipe community feed and interactions
DELETE FROM posts;
DELETE FROM comments;
DELETE FROM likes;
DELETE FROM follows;

-- 3. Wipe all notifications
DELETE FROM notifications;

-- 4. Wipe audit logs
DELETE FROM audit_logs;

-- If you DO want to wipe ALL users as well, uncomment the line below.
-- Note: You will be logged out and have to sign up again!
-- DELETE FROM auth.users;
