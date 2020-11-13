# ************************************************************
# Sequel Pro SQL dump
# Версия 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Адрес: 127.0.0.1 (MySQL 5.7.24-log)
# Схема: testDB
# Время создания: 2019-12-16 10:25:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы shelter
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shelter`;

CREATE TABLE `shelter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `shelter` WRITE;
/*!40000 ALTER TABLE `shelter` DISABLE KEYS */;

INSERT INTO `shelter` (`id`, `img_url`)
VALUES
	(1,'https://i.ibb.co/0n4yNZv/4925dc6e3ed6c8c90b97ba9c9011fc1c.jpg'),
	(2,'https://i.ibb.co/0MWXvGL/819fa54791052c5e7156b03f7d00eb4d.jpg'),
	(3,'https://i.ibb.co/WkRg9ND/654dc473725c6516742ca6ecc5c36828.jpg'),
	(4,'https://i.ibb.co/MCXLx0V/631f66f9af424cf4abf6a4cf5b3e4aeb.jpg'),
	(5,'https://i.ibb.co/Jc0bMJ5/436ce888330d18619cf7354c44d7a588.jpg'),
	(7,'https://i.ibb.co/YTDvxnw/75f96ee3cb58eea6b4ae1eb4f3eb4438.jpg'),
	(9,'https://i.ibb.co/stcm9nq/79c5ac8d7895b7cccd6f204b71cb1dc9.jpg'),
	(10,'https://i.ibb.co/bsWk2kS/62f7859f2e5f6a1614edf908d7797cd8.jpg'),
	(11,'https://i.ibb.co/F8CSTYn/55b775757083bc2c3a14a5ca98915b48.jpg'),
	(12,'https://i.ibb.co/MfQyZX2/38e9b1f8633d9751b906502fd03800c5.jpg'),
	(13,'https://i.ibb.co/rkLF8gY/9d041fe137e84b728ffa0c78bee92ced.jpg'),
	(14,'https://i.ibb.co/JRy6qtq/9ba66a4babe2672a73ce401dee8ac5e8.jpg'),
	(15,'https://i.ibb.co/LxVgn0g/8eae0e4a09f0c73efcebd8de8d1662e6.jpg'),
	(16,'https://i.ibb.co/wL4cNYh/8e7a9019e659551f5c1022eeaa738215.jpg'),
	(17,'https://i.ibb.co/0VqLRrT/8ad127f9f4ecbd8b3ae627b73ff91e09.jpg'),
	(18,'https://i.ibb.co/mXn9mKK/7f40a8996135d590532175d91858faf4.jpg'),
	(19,'https://i.ibb.co/w0h3bL0/5bedc433b8671aec36f0ebe98eb2b54f.jpg'),
	(20,'https://i.ibb.co/FBwgbc8/4f5e26bc3c11514f74783fa1e90e3884.jpg'),
	(21,'https://i.ibb.co/G2svxKb/3f7d2bd70aa6dcf44a343e353fbec9fc.jpg'),
	(22,'https://i.ibb.co/hCgJR6P/2f27cd0ad50b735b4070ae72c421d657.jpg'),
	(23,'https://i.ibb.co/YZ0jR9x/2ad133f40822cf981ad93f5db54a4c54.jpg'),
	(24,'https://i.ibb.co/CtTz0bL/0a644b1a2237931975c391d1165dc00b.jpg'),
	(25,'https://i.ibb.co/pX3jjW8/6a54833898826b3a78f6d529decb9698.jpg'),
	(26,'https://i.ibb.co/D7jgcKN/fb145b93fe20936adbdc323bc31f3c95.jpg'),
	(27,'https://i.ibb.co/7JxTqkX/f8501de67155905711fce286dd9ad58d.jpg'),
	(28,'https://i.ibb.co/16D7Dpq/ea8b7fb9951a6cf38121be00929caab7.jpg'),
	(29,'https://i.ibb.co/vQRDcrZ/e1847c3f6ffea79c827b6021ade1cf0a.jpg'),
	(30,'https://i.ibb.co/ynjg2rZ/e648bceab14260af6a2e3762dedbdb08.jpg'),
	(31,'https://i.ibb.co/bBh88Rm/e08cd8141fa9639ce9a6cc2ffe2e680f.jpg'),
	(32,'https://i.ibb.co/LvnMjXJ/8904d92c5a39bc931cc571b5e19c920c.jpg'),
	(33,'https://i.ibb.co/54F6Tgz/52371c2a6f2feeca82fe33db1cc1c3cb.jpg'),
	(34,'https://i.ibb.co/LJ3wtc2/077855a5860a250d1a797e59b448e861.jpg'),
	(35,'https://i.ibb.co/pZptD62/6285736c097911cfd06c185e052e299f.jpg'),
	(36,'https://i.ibb.co/4p46LYV/a14e79528b2f85b8d07760809c1ad8e7.jpg'),
	(37,'https://i.ibb.co/5Ld4d2J/a84dced7a7a195197f07d1134795568d.jpg'),
	(38,'https://i.ibb.co/zPJrrJK/ba771cdcf857889946bc8037682acd49.jpg'),
	(39,'https://i.ibb.co/Hg9TS6K/cea90a8584b7f1eedd1317c8e6b4008c.jpg'),
	(40,'https://i.ibb.co/rMdTTdj/d2c64eed98f1b26c7fcaf97564f16e71.jpg');

/*!40000 ALTER TABLE `shelter` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
