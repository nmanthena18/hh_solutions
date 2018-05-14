-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2018 at 05:31 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hh_solutions`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_details`
--

CREATE TABLE `billing_details` (
  `bill_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL DEFAULT '"NO Name"',
  `payment_type` varchar(45) NOT NULL DEFAULT '"CASH"',
  `bill_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_details`
--

INSERT INTO `billing_details` (`bill_id`, `customer_name`, `payment_type`, `bill_number`) VALUES
(10, 'Naresh', '\"CASH\"', 10);

-- --------------------------------------------------------

--
-- Table structure for table `bill_product`
--

CREATE TABLE `bill_product` (
  `product_id` int(11) NOT NULL,
  `bill_number` int(11) NOT NULL
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

CREATE TABLE `products` (
  `prd_id` int(11) NOT NULL,
  `prd_name` varchar(100) NOT NULL,
  `prd_shortname` varchar(45) DEFAULT 'Null',
  `prd_price` int(11) NOT NULL,
  `prd_qty` int(11) NOT NULL,
  `prd_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prd_updated_date` timestamp NULL DEFAULT NULL,
  `prd_scode` varchar(20) NOT NULL,
  `prd_desc` varchar(500) NOT NULL,
  `prd_gst` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prd_id`, `prd_name`, `prd_shortname`, `prd_price`, `prd_qty`, `prd_created_date`, `prd_updated_date`, `prd_scode`, `prd_desc`, `prd_gst`) VALUES
(1, 'something45646', '111', 1111, 0, '2018-05-04 07:33:26', NULL, '4555', '132121', 12),
(2, '123456', '1', 1, 1, '2018-05-10 19:04:19', NULL, '1', '1', 0),
(3, '123456', '1', 1, 1, '2018-05-10 19:06:01', NULL, '1', 'There is just one source of truth, that is the state of the page( or store if you are using it). Any change in the grid is passed', 1),
(4, 'Srinu', '20120', 0, 266, '2018-05-13 04:50:24', NULL, '5', ' sadasdkjashk', 52),
(5, 'ssss', '4566', 0, 12345, '2018-05-13 10:31:42', NULL, '2', '  bhghjghj', 12),
(6, 'something1', '1123', 0, 121, '2018-05-13 11:37:41', NULL, '122', '', 12);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(4) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` timestamp NULL DEFAULT NULL,
  `password` binary(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `name`, `created_date`, `modified_date`, `password`) VALUES
(1234, 'nareshm@gmail.com', 'Naresh', '2018-05-09 16:39:52', '0000-00-00 00:00:00', 0x24326224303724796b56375365354675514c377a),
(9090, 'naresh@gmail.com', 'Naresh', '2018-05-04 06:58:35', NULL, 0x0000000000000000000000000000000000000000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_details`
--
ALTER TABLE `billing_details`
  ADD PRIMARY KEY (`bill_id`),
  ADD UNIQUE KEY `bill_id_UNIQUE` (`bill_id`),
  ADD UNIQUE KEY `bill_number_UNIQUE` (`bill_number`);

--
-- Indexes for table `bill_product`
--
ALTER TABLE `bill_product`
  ADD KEY `BILL_ID_idx` (`bill_number`),
  ADD KEY `PRD_ID_idx` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prd_id`),
  ADD UNIQUE KEY `idproducts_UNIQUE` (`prd_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `idusers_UNIQUE` (`user_id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_details`
--
ALTER TABLE `billing_details`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill_product`
--
ALTER TABLE `bill_product`
  ADD CONSTRAINT `BILL_ID` FOREIGN KEY (`bill_number`) REFERENCES `billing_details` (`bill_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `PRD_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`prd_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
