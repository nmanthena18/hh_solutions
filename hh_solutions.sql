-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2018 at 03:24 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hh_solutions`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_details`
--

CREATE TABLE IF NOT EXISTS `billing_details` (
  `bill_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL DEFAULT '"NO Name"',
  `payment_type` varchar(45) NOT NULL DEFAULT '"CASH"',
  `bill_number` int(11) NOT NULL,
  PRIMARY KEY (`bill_id`),
  UNIQUE KEY `bill_id_UNIQUE` (`bill_id`),
  UNIQUE KEY `bill_number_UNIQUE` (`bill_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `billing_details`
--

INSERT INTO `billing_details` (`bill_id`, `customer_name`, `payment_type`, `bill_number`) VALUES
(10, 'Naresh', '"CASH"', 10);

-- --------------------------------------------------------

--
-- Table structure for table `bill_product`
--

CREATE TABLE IF NOT EXISTS `bill_product` (
  `product_id` int(11) NOT NULL,
  `bill_number` int(11) NOT NULL,
  KEY `BILL_ID_idx` (`bill_number`),
  KEY `PRD_ID_idx` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill_product`
--

INSERT INTO `bill_product` (`product_id`, `bill_number`) VALUES
(1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `prd_name` varchar(100) NOT NULL,
  `prd_shortname` varchar(45) DEFAULT 'Null',
  `prd_price` int(11) NOT NULL,
  `prd_qty` int(11) NOT NULL,
  `prd_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prd_updated_date` timestamp NULL DEFAULT NULL,
  `prd_scode` varchar(20) NOT NULL,
  `prd_desc` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `idproducts_UNIQUE` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `prd_name`, `prd_shortname`, `prd_price`, `prd_qty`, `prd_created_date`, `prd_updated_date`, `prd_scode`, `prd_desc`) VALUES
(1, 'something', 'smn', 200, 20, '2018-05-04 07:33:26', NULL, '1201', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(4) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `password` binary(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `idusers_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `name`, `created_date`, `modified_date`, `password`) VALUES
(9090, 'naresh@gmail.com', 'Naresh', '2018-05-04 06:58:35', NULL, '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill_product`
--
ALTER TABLE `bill_product`
  ADD CONSTRAINT `PRD_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `BILL_ID` FOREIGN KEY (`bill_number`) REFERENCES `billing_details` (`bill_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
