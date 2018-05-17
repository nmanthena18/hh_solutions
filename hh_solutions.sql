CREATE DATABASE  IF NOT EXISTS `hh_solutions` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hh_solutions`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: hh_solutions
-- ------------------------------------------------------
-- Server version	5.5.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill_products`
--

DROP TABLE IF EXISTS `bill_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bill_products` (
  `prd_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `prd_price` varchar(45) DEFAULT NULL,
  `prd_gst` varchar(45) DEFAULT NULL,
  `prd_qty` varchar(45) DEFAULT NULL,
  `total` varchar(45) DEFAULT NULL,
  KEY `BILL_ID_idx` (`bill_id`),
  KEY `PRD_ID_idx` (`prd_id`),
  CONSTRAINT `BILL_ID` FOREIGN KEY (`bill_id`) REFERENCES `billing_details` (`bill_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PRD_ID` FOREIGN KEY (`prd_id`) REFERENCES `products` (`prd_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_products`
--

LOCK TABLES `bill_products` WRITE;
/*!40000 ALTER TABLE `bill_products` DISABLE KEYS */;
INSERT INTO `bill_products` VALUES (1,10,NULL,NULL,NULL,NULL),(1,1008,'555','60','5','2775'),(21,1008,'132','2','2','264'),(1,1018,'555','12','1','555'),(1,1019,'555','12','7','555'),(3,1020,'0','0','2','0'),(3,1021,'0','0','1','0'),(3,1022,'0','0','1','0'),(3,1023,'0','0','1','0'),(3,1024,'0','0','1','0'),(3,1025,'0','0','1','0'),(3,1026,'0','0','1','0'),(3,1027,'0','0','1','0'),(3,1028,'0','0','1','0'),(3,1029,'0','0','1','0'),(3,1030,'0','0','1','0'),(3,1031,'0','0','1','0'),(3,1032,'0','0','1','0'),(3,1033,'0','0','1','0'),(3,1034,'0','0','1','0'),(3,1035,'0','0','1','0'),(3,1036,'0','0','1','0'),(3,1037,'0','0','2','0'),(3,1038,'0','0','1','0'),(3,1039,'0','0','1','0'),(21,1040,'132','1','1','132'),(6,1041,'55','0','1','55'),(6,1042,'55','0','1','55'),(6,1043,'55','0','1','55'),(6,1044,'55','0','1','55'),(6,1045,'55','0','1','55'),(6,1046,'55','0','1','55'),(7,1047,'0','0','1','0'),(6,1048,'55','0','1','55'),(6,1049,'55','0','1','55'),(7,1050,'0','0','1','0'),(6,1051,'55','0','1','55'),(6,1052,'55','0','1','55'),(6,1053,'55','0','1','55'),(6,1054,'55','0','1','55'),(6,1055,'55','0','1','55');
/*!40000 ALTER TABLE `bill_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing_details`
--

DROP TABLE IF EXISTS `billing_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billing_details` (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL DEFAULT '"NO Name"',
  `payment_type` varchar(45) NOT NULL DEFAULT '"CASH"',
  `received_amount` varchar(45) NOT NULL,
  `total_amount` varchar(45) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bill_id`),
  UNIQUE KEY `bill_id_UNIQUE` (`bill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1056 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_details`
--

LOCK TABLES `billing_details` WRITE;
/*!40000 ALTER TABLE `billing_details` DISABLE KEYS */;
INSERT INTO `billing_details` VALUES (10,'Naresh','\"CASH\"','','',NULL),(1000,'Ashish','Cheque','','',NULL),(1001,'NO Name','CASH','3400','3039','2018-05-16 10:36:15'),(1002,'NO Name','CASH','3400','3039','2018-05-16 10:36:33'),(1003,'NO Name','CASH','3400','3039','2018-05-16 10:58:14'),(1004,'NO Name','CASH','3400','3039','2018-05-16 10:58:51'),(1005,'NO Name','CASH','3400','3039','2018-05-16 10:59:23'),(1006,'NO Name','CASH','3400','3039','2018-05-16 11:02:30'),(1007,'NO Name','CASH','3400','3039','2018-05-16 11:04:39'),(1008,'NO Name','CASH','3400','3039','2018-05-16 11:06:08'),(1009,'NO Name','CASH','500','555','2018-05-16 11:44:41'),(1010,'Naresh','CASH','500','555','2018-05-16 11:46:07'),(1011,'Naresh','CASH','500','555','2018-05-16 12:16:17'),(1012,'Naresh','CASH','500','555','2018-05-16 12:16:44'),(1013,'Naresh','CASH','500','555','2018-05-16 12:16:56'),(1014,'Naresh','CASH','500','555','2018-05-16 12:18:04'),(1015,'Naresh','CASH','500','555','2018-05-16 12:18:54'),(1016,'Naresh','CASH','500','555','2018-05-16 12:19:16'),(1017,'Naresh','CASH','500','555','2018-05-16 12:19:40'),(1018,'Naresh','CASH','500','555','2018-05-16 12:22:48'),(1019,'NO Name','CASH','3000','3885','2018-05-16 14:07:45'),(1020,'NO Name','CASH','0','0','2018-05-16 14:09:42'),(1021,'NO Name','CASH','0','0','2018-05-16 14:20:37'),(1022,'NO Name','CASH','0','0','2018-05-16 14:21:08'),(1023,'NO Name','CASH','3','0','2018-05-16 14:23:11'),(1024,'NO Name','CASH','3','0','2018-05-16 14:23:36'),(1025,'NO Name','CASH','3','0','2018-05-16 14:24:03'),(1026,'NO Name','CASH','3','0','2018-05-16 14:24:21'),(1027,'NO Name','CASH','4','0','2018-05-16 14:30:00'),(1028,'NO Name','CASH','3','0','2018-05-16 14:30:43'),(1029,'NO Name','CASH','1','0','2018-05-16 14:31:29'),(1030,'NO Name','CASH','1','0','2018-05-16 14:32:03'),(1031,'NO Name','CASH','2','0','2018-05-16 14:32:47'),(1032,'NO Name','CASH','3','0','2018-05-16 14:33:56'),(1033,'NO Name','CASH','2','0','2018-05-16 14:36:31'),(1034,'NO Name','CASH','2','0','2018-05-16 14:37:10'),(1035,'NO Name','CASH','3','0','2018-05-16 14:38:57'),(1036,'NO Name','CASH','2','0','2018-05-16 14:39:30'),(1037,'NO Name','CASH','2','0','2018-05-16 14:40:20'),(1038,'NO Name','CASH','2','0','2018-05-16 14:40:53'),(1039,'NO Name','CASH','3','0','2018-05-16 14:41:37'),(1040,'NO Name','CASH','100','132','2018-05-17 09:00:03'),(1041,'NO Name','CASH','11','55','2018-05-17 09:04:06'),(1042,'NO Name','CASH','11','55','2018-05-17 09:05:30'),(1043,'NO Name','CASH','11','55','2018-05-17 09:05:59'),(1044,'NO Name','CASH','22','55','2018-05-17 09:08:19'),(1045,'NO Name','CASH','33','55','2018-05-17 09:09:11'),(1046,'NO Name','CASH','2','55','2018-05-17 09:09:39'),(1047,'NO Name','CASH','22','0','2018-05-17 09:10:05'),(1048,'NO Name','CASH','222','55','2018-05-17 09:11:10'),(1049,'NO Name','CASH','22','55','2018-05-17 09:11:45'),(1050,'NO Name','CASH','223','0','2018-05-17 09:12:17'),(1051,'NO Name','CASH','22','55','2018-05-17 09:14:50'),(1052,'NO Name','CASH','232','55','2018-05-17 09:15:27'),(1053,'NO Name','CASH','444','55','2018-05-17 09:15:44'),(1054,'NO Name','CASH','444','55','2018-05-17 09:16:20'),(1055,'NO Name','CASH','23','55','2018-05-17 09:17:14');
/*!40000 ALTER TABLE `billing_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `prd_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_name` varchar(100) NOT NULL,
  `prd_shortname` varchar(45) DEFAULT 'Null',
  `prd_price` int(11) NOT NULL,
  `prd_qty` int(11) NOT NULL,
  `prd_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prd_updated_date` timestamp NULL DEFAULT NULL,
  `prd_scode` varchar(20) NOT NULL,
  `prd_desc` varchar(500) DEFAULT NULL,
  `prd_gst` int(11) NOT NULL,
  UNIQUE KEY `idproducts_UNIQUE` (`prd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'nnnnn2sNNNAA','mmmmm',1,1,'2018-05-04 07:33:26','2018-05-17 06:07:53','2','herheheww',12),(2,'555555','1321321212',2,2,'2018-05-10 12:38:02','2018-05-17 05:35:49','3','13132132',1321),(3,'Naresh1','12311',3,3,'2018-05-10 13:08:37','2018-05-17 05:33:04','4','121',0),(4,'123121232','11111212',4,4,'2018-05-10 13:15:46','2018-05-14 07:33:41','5','12',0),(5,'asdasd','123',5,5,'2018-05-10 13:17:14',NULL,'6','22',0),(6,'sadasd sa','454654',6,6,'2018-05-10 13:18:00',NULL,'7','44',0),(7,'ASasadsd','45465',7,7,'2018-05-10 13:18:49','2018-05-14 07:43:52','8','112',0),(21,'Name','short',8,8,'2018-05-15 10:07:27','2018-05-17 05:57:22','9',' thuh',10),(70,'somethingYahooGoole','ssss',9,9,'2018-05-17 11:19:31','2018-05-17 06:08:10','10',' nothing.....',10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(4) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `idusers_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9999,'nmanthena18@gmail.com','Naresh','2018-05-08 10:43:19','0000-00-00 00:00:00','$2b$07$Tgno0oZhHoToYAOORvaNNue7ecjqtfY8CHB8eZAqySy7dg7A3LMnK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-17 19:57:46
