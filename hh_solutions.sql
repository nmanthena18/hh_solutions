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
