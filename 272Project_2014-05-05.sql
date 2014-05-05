# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.16)
# Database: 272Project
# Generation Time: 2014-05-05 07:29:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table login_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `login_details`;

CREATE TABLE `login_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `login_details` WRITE;
/*!40000 ALTER TABLE `login_details` DISABLE KEYS */;

INSERT INTO `login_details` (`id`, `username`, `password`)
VALUES
	(1,'team4.272.2014@gmail.com','VishalChothani');

/*!40000 ALTER TABLE `login_details` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table option_question_answer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `option_question_answer`;

CREATE TABLE `option_question_answer` (
  `oqa_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `option_id` int(11) unsigned DEFAULT NULL,
  `question` varchar(500) DEFAULT NULL,
  `answer` varchar(50000) DEFAULT NULL,
  PRIMARY KEY (`oqa_id`),
  KEY `option_id_fk` (`option_id`),
  CONSTRAINT `option_id_fk` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `option_question_answer` WRITE;
/*!40000 ALTER TABLE `option_question_answer` DISABLE KEYS */;

INSERT INTO `option_question_answer` (`oqa_id`, `option_id`, `question`, `answer`)
VALUES
	(1,1,'How do I log into my Facebook account?','1)    Make sure no one else is logged in\n        To log someone else out, click at the top right of any Facebook page and select Log Out\n2)    Go to the top of www.facebook.com and enter one of the following:\n        Email address: You can log in with any email address that is currently listed on your Facebook account\n        Username: You can also log in with your username\n        Mobile number: If you have a mobile number confirmed on your account you can enter it here (skip the zeros before the country code and any symbols)\n3)    Enter your password\n4)    Click Login'),
	(2,1,'How do I log out of Facebook?','To log out of Facebook:\n\n	1)    Click at the top right of any Facebook page\n	2)    Select Log Out'),
	(3,1,'I don\'t know if I still have a Facebook account. How can I find out?','If an account you created is still on Facebook, we can help you find it. You\'ll need to know an email address, a phone number, or the username associated with your account. You may also be able to find the account using your name and the name of someone you\'re friends with on Facebook.\n\nOnce you find the account, you can reset your password. You can then continue using your account or delete it.'),
	(4,1,'How do I reset my password?','If you\'re logged out of your account and you can\'t remember your password:\n\nYou can request a new password by clicking the Forgot your password? link on the Facebook login page. We\'ll send you an email with a link to reset your password.\n\nIf you\'re logged into your account:\n\n1)    Click at the top right of any Facebook page and select Settings\n2)    Click on the Password section\n3)    Enter your current password and a new password and save your changes'),
	(5,1,'What is the minimum password strength? And how can I make my passeord strong?','When you create a new password, make sure that it\'s at least 6 characters long. Try to use a complex combination of numbers, letters and punctuation marks. If the password you entered isn\'t strong enough, try mixing together uppercase and lowercase letters or making the password longer.\n\nThe password you create should be easy for you to remember but hard for someone else to figure out. For extra security, your Facebook password should be different than other passwords that you use to log into other places, like your email or bank account.'),
	(6,1,'I don?t know if I still have a facebook account. How can I find out?','If an account you created is still on Facebook, we can help you find it. You\'ll need to know an email address, a phone number, or the username associated with your account. zzYou may also be able to find the account using your name and the name of someone you\'re friends with on Facebook.'),
	(7,2,'How do I permanently delete my account?','If you deactivate your account, your Timeline disappears from the Facebook service immediately. People on Facebook won\'t be able to search for you, though some info, like messages you sent, may still be visible to others. We also save your Timeline information (ex: friends, photos, interests) in case you want to come back.\nIf you don\'t think you\'ll use Facebook again, you can request to have your account permanently deleted. Please keep in mind that you won\'t be able to reactivate your account or retrieve anything you\'ve added. Before you do this, you may want to download a copy of your info from Facebook. Then, if you\'d like your account permanently deleted with no option for recovery, log into your account and let us know.\nIf you can\'t log in to your account, you\'ll need to reset your password first. To do this, go to www.facebook.com and click the Forgot your password? link below the password field. Once you?ve followed the instructions to reset your password and can log into your account, you can deactivate or delete your account using the steps outlined above.\n'),
	(8,2,'What is the minimum password strength and how can I make my password strong?','When you create a new password, make sure that it\'s at least 6 characters long. Try to use a complex combination of numbers, letters and punctuation marks. If the password you entered isn\'t strong enough, try mixing together uppercase and lowercase letters or making the password longer.\nThe password you create should be easy for you to remember but hard for someone else to figure out. For extra security, your Facebook password should be different than other passwords that you use to log into other places, like your email or bank account.\n'),
	(9,2,'How do I change which email address facebook notifications are sent to ?','When you create a new password, make sure that it\'s at least 6 characters long. Try to use a complex combination of numbers, letters and punctuation marks. If the password you entered isn\'t strong enough, try mixing together uppercase and lowercase letters or making the password longer.\nThe password you create should be easy for you to remember but hard for someone else to figure out. For extra security, your Facebook password should be different than other passwords that you use to log into other places, like your email or bank account.'),
	(10,2,'How do I change my language settings?','To update your language:\nClick at the top right of a Facebook page and select Settings\nClick Edit to the right of the Language section\nSelect your primary language from the dropdown menu and click Save Changes\nYou can also set your language from any Facebook page. Simply scroll to the bottom of the right column and click your current language, then choose a new language from the menu.\n'),
	(11,2,'Can I update my security question?','We want to make sure that your account and the information in it stays safe, so once you set up a security question on your account there\'s no way to update it. Sorry for the inconvenience.'),
	(12,2,'How do I change my name?','You can change your name or add an alternate name (ex: nickname or maiden name) to your account. To edit your name: \nReview our name standards\nClick in the upper-right corner of any Facebook page and select Settings\nLook for the Name setting and click Edit to the far right\nType in your name and save your changes\n'),
	(13,3,'There is a fraudulent activity in my ad account.','If you believe that there has been fraudulent activity on your ad account, review your purchase history to make sure you\'re aware of all the purchases made on your ad account. If you see purchases that you don\'t recognize and believe someone else made them who shouldn\'t have access to your ad account, submit a report to our ads team.\n'),
	(14,3,'My account was hacked and used to make purchase on apps.','If there\'s spending activity on your account that you don\'t recognize, please review your purchase history. If you still don\'t recognize this activity after reviewing your purchases, please submit a report.\n'),
	(15,3,'My account was hacked and my pocker chips were stolen.','It sounds like your account information was phished. Unfortunately, we can?t help you get your poker chips back. These games are made by other companies, and we don?t have access to their data.\nHere?s what you can do:\nReset your Facebook password\nReport what happened to the developer \n'),
	(16,3,'How do I block or unblock an app?','When you block an app, it won\'t be able to access any information about you from Facebook or send you any requests.\nTo block an app from your settings:\nClick at the top right of any Facebook page and select Settings.\nClick Blocking in the left menu.\nIn the Block apps section, enter the name of the app you want to block. You can unblock an app by clicking Unblock to the right of its name.\nIf you received a request from an app and you want to block the app:\nGo to the App Center and click Requests in the left column. \nClick x next to the request.\nClick the Block [App Name] link > Confirm.\nThe app may have kept info from when you used it. You can contact the app directly to request that they delete any info it may still have. \n'),
	(17,3,'Can apps store my info?','The Facebook Platform Policies require that apps and websites explicitly ask for permission to access info from you and your friends. When you grant that permission, apps can store the info they receive, but they are not allowed to transfer your info without your consent or use your info for advertisements. If you\'d like the info that you\'ve shared with the app to be permanently deleted, contact the developer directly.\n'),
	(18,3,'How does privacy work for apps games and websites?','On Facebook, your name, profile picture, gender, username, user ID (account number) and networks are publicly available. Apps, games and websites also have access to your friend list and any info you choose to make public.\nNote: Apps, games and websites can only publish stories to people within the audience you choose. Learn more about adjusting your privacy settings for your apps and games.'),
	(19,4,'How do I add or change my profile picture?','Your profile picture helps people recognize you on Facebook. To add a profile picture or change your current profile picture: \nGo to your Timeline (which we sometimes refer to as your profile) and hover over your profile picture\nClick Update Profile Picture to edit your picture\nChoose whether you want to:\nPick a photo you already uploaded to Facebook\nTake a new photo\nUpload a photo from your computer\nEdit your thumbnail\nRemove your current photo\nYou can use any of the photos you\'ve uploaded to Facebook, or photos your friends have uploaded, if you\'re tagged in them: \nClick on the photo you want to use to expand it\nHover over the photo and select Options\nClick Make Profile Picture\nCrop the photo and click Done Cropping\nKeep in mind, your current profile picture is public.\n'),
	(20,4,'How do I add or change my cover photo?','A cover photo is the larger photo at the top of your Timeline, right above your profile picture. Like your profile picture, cover images are public, which means anyone visiting your Timeline will be able to see them.\nWe\'ve found that people have a better experience viewing your Timeline when they see a cover that is as unique and individualized as you are. This helps people learn more about you. It also helps us prevent spam, fake profiles, and other content that can detract from your experience on Facebook. An easy way to ensure your cover image is unique is to choose an image from your life, like a photo from a wedding, day at the beach, or birthday party. If you want to use a photo to show solidarity or express support for a cause or organization, you can still post a status or photo.\nTo add or change your cover photo: \nGo to your Timeline\nClick Add a Cover, or hover over your current cover photo and click Change Cover\nChoose whether you want to upload a new photo or pick a photo from one of your existing photo albums\nOnce you choose a photo, you can reposition it by clicking on the image and dragging it up or down\nClick Save'),
	(21,4,'Who can see my cover photo?','If you add a cover photo to your Timeline, it will be visible to the public, just like your profile picture. This means that anyone can see your current cover photo and any other images you?ve used as a cover. So unlike most of your other photo albums, when you visit your Cover Photos album you won?t see an option to adjust the album privacy settings.\n'),
	(22,4,'How do I post to my timeline?','You can share new stories from the top of your Timeline or your News Feed:\nPick what type of story you want to share\nType in any details you want to add\nYou can also: \ntag friends\npick a date for the story\nadd a feeling or what you\'re doing\nadd a location\nadd a photo\nSelect an audience for your post\nClick Post\n'),
	(23,4,'Can I choose who can see pages and other things I have liked?','You can select an audience for each section of likes on your About page: \nGo to your Timeline and click About below your cover photo \nScroll down to your Likes section and click \nSelect Edit Privacy, then use the audience selector next to each section to select who can see things you\'ve liked in that section\nNote: When you share something on your Timeline, the audience you choose can also see it other places on Facebook, such as in News Feed and search.\n'),
	(24,4,'How do I change my relationship status from my timeline?','To edit your relationship status:\nGo to your Timeline and click Update Info\nNext to Basic Information click Edit\nNext to Relationship Status, choose your relationship status from the dropdown menu\nIf you?re in a relationship, type in the name of the person you?re in a relationship with\nIf you\'d like, you can choose an anniversary date\nUse the audience selector to choose who you want to share this with\nSave your changes\n'),
	(25,5,'How do I find the latest version of facebook app and upgrade?','You can find the latest versions of the Facebook apps by going to our Facebook for Mobile page or visiting your phone\'s app store (ex: the iPhone app store, Google Play). From here, you can see what\'s new with the app and install the latest version.'),
	(26,5,'How do I log out of facebook from mobile?','To log out of Facebook:\nClick at the top right of any Facebook page\nSelect Log Out\n'),
	(27,6,'How do I upload photos?\n','To add and post photos to Facebook:\nClick Add Photos/Video at the top of your News Feed.\nSelect an option:\nUpload Photos/Video: Post photos from your computer. The photos you post will be added to your Timeline Photos album.\nAdd Synced Photos: If you have photo syncing turned on, you can post photos that have synced from your phone or tablet. The photos you post will be added to your Timeline Photos album.\nCreate Photo Album: Post photos from your computer to a new album. \nSelect the photos you want to add to Facebook.\n'),
	(28,6,'How many photos can I upload?','You can upload about 1000 photos per album.\n'),
	(29,6,'How do I upload high resolution photos?','For better quality photos, check the High Quality box when you create an album.\n');

/*!40000 ALTER TABLE `option_question_answer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table options
# ------------------------------------------------------------

DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `option_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `option` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;

INSERT INTO `options` (`option_id`, `option`)
VALUES
	(1,'Login and Password'),
	(2,'Account Settings'),
	(3,'Security'),
	(4,'Timeline'),
	(5,'Facebook Mobile'),
	(6,'Sharing');

/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question_set
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question_set`;

CREATE TABLE `question_set` (
  `question_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) unsigned DEFAULT NULL,
  `topic` varchar(50) DEFAULT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `reply` varchar(1000) DEFAULT NULL,
  `timestamp` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `ticket_id_fk` (`ticket_id`),
  CONSTRAINT `ticket_id_fk` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `question_set` WRITE;
/*!40000 ALTER TABLE `question_set` DISABLE KEYS */;

INSERT INTO `question_set` (`question_id`, `ticket_id`, `topic`, `question`, `reply`, `timestamp`)
VALUES
	(1,1,'Login','How to login',NULL,NULL),
	(2,2,'Login','How to login',NULL,NULL),
	(3,3,'pages','how to create pages in FB',NULL,NULL),
	(4,4,'pages','how to create pages in FB',NULL,NULL);

/*!40000 ALTER TABLE `question_set` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ticket
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ticket`;

CREATE TABLE `ticket` (
  `ticket_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `urgency` varchar(50) DEFAULT NULL,
  `sub_time` varchar(50) DEFAULT NULL,
  `expiry_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `user_id_pk` (`user_id`),
  CONSTRAINT `user_id_pk` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;

INSERT INTO `ticket` (`ticket_id`, `user_id`, `status`, `urgency`, `sub_time`, `expiry_date`)
VALUES
	(1,1,'working','Low','May 4 2014 5:56 PM','May 7 2014 5:56 PM'),
	(2,1,'working','Low','May 4 2014 5:56 PM','May 7 2014 5:56 PM'),
	(3,2,'working','Medium','May 4 2014 5:56 PM','May 7 2014 5:56 PM'),
	(4,2,'working','Medium','May 4 2014 5:56 PM','May 7 2014 5:56 PM');

/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;

INSERT INTO `user_info` (`user_id`, `username`, `email`)
VALUES
	(1,'Vishal','vishal.k.chothani@gmail.com'),
	(2,'mahesh','mahesh.bingi@gmail.com');

/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
