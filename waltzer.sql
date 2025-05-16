-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2025 at 07:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waltzer`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(500) NOT NULL,
  `pfile` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Id`, `name`, `email`, `pfile`, `password`, `role`) VALUES
(3, 'Shruti Sharma', 'admin_category@gmail.com', 'img1.jpg', 'shruti@123', 'Category'),
(4, 'Smitha Das', 'admin_reviews@gmail.com', 'shiksha.jpg', 'smitha@123', 'reviews_rating'),
(5, 'Aditya Singh', 'admin_userlist@gmail.com', 'shirt.jpg', 'Aditya@3011', 'Userlist'),
(10, 'Kavya Thakur', 'kavya@gmail.com', 'download.jpg', 'Kavya@123', 'others'),
(11, 'Waltzer India', 'waltzify@gmail.com', 'android-chrome-192x192.png', '$2y$10$mAdOa6fjxwNamUuc.EuHseauFCfvm4f4gqbmi98uKgb8Q3XkpUJDm', 'Main Admin'),
(13, 'Manas Rathore', 'admin_waltzer@gmail.com', 'img.jpg', '$2y$10$PlYdaDwoIbZnQ.5rYdZqI.wMiAUKqHuu0itRjd5hp4/4rFLpG8bMy', 'Main Admin'),
(15, 'Shruti Sharma', 'sharmashruti3011@gmail.com', 'e080009e-e624-452d-abb2-80678b01e176.jpg', '$2y$10$r7nDRG.YTGkmTsnUc0EgI.FulH/jKc5rQqcGjbeo5aacl45P8hvYC', 'HandleOrderAdmin'),
(16, 'Kajal Agrawal', 'kajal@gmail.com', '61kqhTCKtgL._SX679_.jpg', '$2y$10$Yu96UgRcGsFyv58m5ibGHOrTWjsc3fE9zoaIqSL6lq/b9obN17nUy', 'HandleOrderAdmin'),
(17, 'Sarovi Intern', 'shruti.sarovi@gmail.com', 'download.jfif', '$2y$10$iTfl0xRnNwotPF/jPxbSGeGzr.6517RGI4dCOfe7mC6ak2yzB1b16', 'Products Admin'),
(18, 'Sagar Bhavel', 'sagar@gmail.com', 'weldingglubs.jpg', '$2y$10$GG.d0I2vMpwncedtZnpinuWFT9BSfGITGHybhlki9LNao1N5ionv6', 'Category Admin'),
(19, 'Manav ', 'manav@gmail.com', '71dJiDl1rAL._SX522_.jpg', '$2y$10$A4vJtGkhwunkP4ZT6suDUuYzARGeGwpNx8/qAAH2tBxmGeoA6HEf.', 'ReviewsRatingAdmin'),
(20, 'Kamal Nagar', 'kamal@gmail.com', 'chain-jacket-250x250.jpg', '$2y$10$Xr03AvvXal1YeNyiSbagI.SjH2xGBDDKPr9zWpP58jz3TBxH9R3Y2', 'HandleUserAdmin');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `bannerId` int(11) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `text` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`bannerId`, `image`, `text`, `start_date`, `end_date`) VALUES
(1, 'banner.jpg', 'Shop Now', '2024-06-25', '2024-07-26'),
(2, 'waltzer-india-pvt-ltd-siyaganj-indore-cover-block-manufacturers-69bpms.jpg', 'Shop now', '2024-06-28', '2024-06-25'),
(3, 'bannerimages.jpg', 'Shop now', '2024-06-28', '2024-07-05'),
(4, 'banner.jpg', 'shop now', '2024-06-28', '2024-06-28'),
(5, 'labor-personal-protective-gear-industry-construction-site-work-health-safety_771335-5031.jpg', 'Shop Now', '2024-08-20', '2024-08-20'),
(6, 'image_processing20201114-29431-cxvyn6.JPG', 'Shop Now', '2024-09-02', '2024-09-02'),
(10, '9742750.jpg', '', '2024-10-28', '2024-10-29'),
(11, 'Safety-Products_enhanced.webp', '', '2024-11-05', '2024-11-05'),
(12, 'Strength & Innovation for Industrial Excellence! (4).jpg', 'shop', '2024-11-12', '2024-11-12'),
(13, '2.jpg', '1', '2024-11-19', '2024-11-19');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartId`, `UserId`, `ProductId`) VALUES
(5, 23, 45),
(20, 27, 47),
(24, 27, 19),
(25, 28, 49),
(28, 30, 8),
(85, 33, 4),
(91, 21, 29),
(113, 39, 28),
(121, 40, 48),
(122, 40, 27),
(129, 35, 29),
(131, 35, 28),
(145, 26, 51),
(185, 41, 31),
(187, 41, 51),
(189, 41, 52),
(226, 19, 52),
(230, 55, 52),
(235, 79, 48),
(236, 79, 56),
(240, 2, 51),
(242, 8, 19);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `cname` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `email`, `cname`, `image`) VALUES
(4, 'admin_category@gmail.com', 'Civil Lab Equipments And Shruti Sharma', 'Civil Lab Equipments.jpg'),
(7, 'admin_category@gmail.com', 'Snake Catcher Stickes And Tools', 'Safety Product.jpg'),
(8, 'admin_category@gmail.com', 'Search and Rescue and Industrial and Scientific', 'Search & Rescue.jpg'),
(9, 'admin_category@gmail.com', 'Silica Gel and Desciccent', 'sil.jpg'),
(10, 'admin_category@gmail.com', 'Fencing Product', 'Fencing Products.jpg'),
(19, '', 'Industry Scientific', 'Building Material.jpg'),
(21, '', 'Sneakers', '21wUVLyd+QL.jpg'),
(24, '', 'Personal Care', '415bMAv6VlL._SY445_SX342_QL70_FMwebp_.jpg'),
(25, '', 'Testing', 'img.jpg'),
(26, '', 'rope', 'Safety-Products_enhanced.webp');

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `Id` int(11) NOT NULL,
  `OrderId` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `customerName` varchar(500) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `addressId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymode` varchar(500) NOT NULL,
  `payment_status` varchar(50) DEFAULT 'Pending',
  `order_status` varchar(50) NOT NULL DEFAULT 'Pending',
  `shipping_status` varchar(255) NOT NULL DEFAULT 'Pending',
  `invoiceNo` varchar(255) NOT NULL,
  `trackingId` varchar(500) NOT NULL,
  `trackingURL` varchar(500) NOT NULL,
  `fssai` varchar(300) NOT NULL,
  `cancel_reason` text NOT NULL,
  `courier_company` varchar(255) NOT NULL,
  `courier_charges` varchar(500) NOT NULL,
  `trackingIdmail` varchar(120) NOT NULL DEFAULT 'Email Not Sent Yet',
  `invoicemail` varchar(120) NOT NULL DEFAULT 'Not Sent Yet',
  `Shipping_date` timestamp NULL DEFAULT NULL,
  `deliveryCharges` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`Id`, `OrderId`, `price`, `timestamp`, `customerName`, `phone`, `addressId`, `userId`, `paymode`, `payment_status`, `order_status`, `shipping_status`, `invoiceNo`, `trackingId`, `trackingURL`, `fssai`, `cancel_reason`, `courier_company`, `courier_charges`, `trackingIdmail`, `invoicemail`, `Shipping_date`, `deliveryCharges`) VALUES
(1, 'ORD417815', '54.3', '2024-09-04 17:29:45', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(2, 'ORD970977', '848.28', '2024-09-05 03:25:02', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(3, 'ORD318228', '257.1', '2024-09-05 06:01:29', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(4, 'ORD213593', '693.98', '2024-09-06 08:28:50', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '353446', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(5, 'ORD13784', '693.98', '2024-09-06 10:56:46', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(6, 'ORD281448', '858.06', '2024-09-07 10:27:44', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(7, 'ORD83413', '858.06', '2024-09-07 10:31:54', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(8, 'ORD574853', '687.06', '2024-09-07 10:43:59', 'Engineer Shayra', '7987361186', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '5', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(9, 'ORD774878', '687.06', '2024-09-07 10:45:01', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(10, 'ORD510579', '687.06', '2024-09-07 10:52:56', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(11, 'ORD2222', '687.06', '2024-09-07 11:08:54', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(12, 'ORD611194', '687.06', '2024-09-07 11:15:10', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(13, 'ORD617855', '687.06', '2024-09-07 11:23:45', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(14, 'ORD444961', '641', '2024-09-07 11:30:14', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '26/10/2000', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-29 13:35:47', ''),
(15, 'ORD10900', '641', '2024-09-07 11:39:28', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '26/05/1982', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-29 13:35:47', ''),
(16, 'ORD991080', '641', '2024-09-07 11:44:19', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '30/11/2002', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-29 13:35:47', ''),
(17, '', '0', '2024-09-07 11:47:31', '', '', 0, 0, '', 'Pending', 'New', 'Pending', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(20, 'ORD798818', '500', '2024-09-07 11:51:38', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(21, 'ORD158490', '154', '2024-09-07 11:54:36', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(22, 'ORD252037', '226.1', '2024-09-07 11:57:38', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(23, 'ORD231237', '154', '2024-09-07 12:02:50', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(24, 'ORD894352', '154', '2024-09-07 12:09:46', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(25, 'ORD191260', '154', '2024-09-07 12:23:15', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'checking reason', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(26, 'ORD891703', '226.1', '2024-09-07 12:30:11', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(27, 'ORD87281', '154', '2024-09-07 12:31:44', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(28, 'ORD508195', '257.1', '2024-09-07 12:36:01', 'Engineer Shayra', '', 25, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(29, 'ORD306937', '154', '2024-09-07 12:38:11', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(30, 'ORD692916', '154', '2024-09-07 12:38:38', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(31, 'ORD681584', '154', '2024-09-07 12:41:05', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(32, 'ORD33531', '154', '2024-09-07 12:44:16', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(33, 'ORD702554', '154', '2024-09-07 12:47:40', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(34, 'ORD364563', '226.1', '2024-09-07 12:51:27', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(35, 'ORD38166', '154', '2024-09-07 12:53:52', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(36, 'ORD433198', '226.1', '2024-09-07 13:04:00', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(37, 'ORD245343', '154', '2024-09-07 13:06:24', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(38, 'ORD907844', '226.1', '2024-09-07 17:08:22', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(39, 'ORD210259', '257.1', '2024-09-07 17:09:29', 'Engineer Shayra', '', 25, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(40, 'ORD878067', '226.1', '2024-09-07 17:21:08', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(41, 'ORD360660', '226.1', '2024-09-07 17:22:20', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(42, 'ORD162645', '226.1', '2024-09-07 17:42:27', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(43, 'ORD151894', '154', '2024-09-07 17:43:42', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(44, 'ORD200026', '154', '2024-09-07 17:44:40', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(45, 'ORD963682', '154', '2024-09-07 18:06:22', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(46, 'ORD278450', '154', '2024-09-07 18:13:31', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(47, 'ORD288695', '226.1', '2024-09-07 18:15:43', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(48, 'ORD834237', '226.1', '2024-09-07 18:17:09', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', 'just for checking', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(49, 'ORD476845', '226.1', '2024-09-07 18:18:30', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(50, 'ORD82771', '154', '2024-09-07 18:19:44', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(51, 'ORD423512', '154', '2024-09-07 18:20:39', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(52, 'ORD47756', '154', '2024-09-07 18:22:39', 'Engineer Shayra', '', 25, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(53, 'ORD580751', '154', '2024-09-07 18:23:20', 'Engineer Shayra', '', 25, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(54, 'ORD809795', '154', '2024-09-07 18:24:18', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(55, 'ORD187683', '154', '2024-09-07 18:27:52', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(56, 'ORD582004', '154', '2024-09-07 18:30:42', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(57, 'ORD36489', '226.1', '2024-09-07 18:40:24', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', '', '', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(58, 'ORD189744', '154', '2024-09-07 18:45:35', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(59, 'ORD72557', '154', '2024-09-07 18:51:23', 'Engineer Shayra', '', 26, 21, 'Prepaid', 'Pending', 'Not Delivered', 'Processing', '', '1051985', 'https://www.bluedart.com/', '', '', 'BlueDart', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-29 11:59:30', ''),
(60, 'ORD791136', '226.1', '2024-09-07 18:52:01', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(61, 'ORD755002', '226.1', '2024-09-07 19:05:27', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(62, 'ORD64310', '154', '2024-09-07 19:08:03', 'Engineer Shayra', '', 26, 21, 'Prepaid', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'cancel - ORD64310', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(63, 'ORD987933', '54.3', '2024-09-09 07:01:25', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(64, 'ORD454845', '64.1', '2024-09-10 06:42:53', 'Shruti Sharma', '7987361186', 20, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', 'wrtw', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(65, 'ORD670001', '54.3', '2024-09-10 08:35:11', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '3454', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(66, 'ORD149874', '54.3', '2024-09-11 11:51:14', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(67, 'ORD786282', '502', '2024-09-11 11:58:55', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(68, 'ORD514324', '1001', '2024-09-11 12:08:35', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(69, 'ORD430213', '1349.28', '2024-09-11 12:44:26', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '123', '123456789', '', '', 'Order has been cancelled by User', '12345', '123456', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(70, 'ORD50664', '501', '2024-09-11 12:45:28', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '12343', 'track122', '', '', 'Order has been cancelled by User', '3434', '4343', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(71, 'ORD136354', '848.28', '2024-09-11 12:45:45', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(72, 'ORD789941', '848.28', '2024-09-11 12:48:55', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(73, 'ORD96611', '49.5', '2024-09-12 07:59:32', 'Shruti Sharma', '7987361186', 18, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'testing reason2', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(74, 'ORD375269', '755.88', '2024-09-13 05:24:52', 'Shruti Sharma', '7987361186', 20, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '1234', 'rertettrt', '', '', 'Order has been cancelled by User', 'Delhivery', '150', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(75, 'ORD656696', '1155.88', '2024-09-13 06:46:40', 'Shruti Sharma', '7987361186', 20, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '123445', '1234', '', '', 'Order has been cancelled by User', '4343', '434', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(76, 'ORD447397', '748.28', '2024-09-14 07:37:25', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'invoice123', 'track1234556', '', '', 'Testing Reason', '5435312', '5434', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(77, 'ORD780121', '755.88', '2024-09-17 10:00:17', 'Shruti Sharma', '7987361186', 20, 19, 'COD', 'COD Payment Not Received', 'New', 'Processing', '30112002', 'shrutitracking', '', '', '', 'Amazon', '100', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(78, 'ORD77055', '1941.6', '2024-09-19 11:15:09', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '42324', '233', '', '', '', 'Delhivery', '500', 'Mailed', 'Not Sent Yet', NULL, ''),
(79, 'ORD77479', '12131.560000000001', '2024-09-19 12:00:22', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '4324324', '323242', '', '', '', 'Amazon', '120', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(80, 'ORD136455', '12131.560000000001', '2024-09-19 15:39:44', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '545435', '53453454', '', '', 'Order has been cancelled by User', 'shruti\'s company', '519', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(81, 'ORD5990', '12131.560000000001', '2024-09-19 16:14:07', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Pending', 'Cancelled', 'Processing', '', '', '', '', 'testing ', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(82, 'ORD885074', '1915.96', '2024-09-19 16:17:02', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '6878', '67678', '', '', 'Order has been cancelled by User', 'sarovi', '100', 'Mailed', 'Not Sent Yet', NULL, ''),
(83, 'ORD692597', '1130.46', '2024-09-20 05:04:02', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(84, 'ORD383634', '1429.96', '2024-09-20 05:32:40', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Pending', 'New', 'Pending', '', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(85, 'ORD645796', '1547.46', '2024-09-20 05:47:13', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '434243', '34244', '', '', 'Order has been cancelled by User', '4322', '12334', 'Mailed', 'Not Sent Yet', NULL, ''),
(86, 'ORD471432', '1547.46', '2024-09-20 05:57:19', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Pending', 'Cancelled', 'Processing', '', '', '', '', 'out of stock now..', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(87, 'ORD222482', '3157.46', '2024-09-20 06:05:11', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '34343242', 'tracking1234', '', '', '', 'Ekart', '500', 'Mailed', 'Not Sent Yet', NULL, ''),
(88, 'ORD177717', '3586.96', '2024-09-20 06:11:45', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '343', '64723437', '', '', '', 'Amazon', '5444', 'Mailed', 'Not Sent Yet', NULL, ''),
(89, 'ORD425423', '4586.96', '2024-09-20 06:19:39', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '1323', 'ekart.1234', '', '', '', 'Sarovi', '1234', 'Mailed', 'Not Sent Yet', NULL, ''),
(90, 'ORD441857', '7387.96', '2024-09-20 10:24:07', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '123456789', 'sharmaji', '', '', '', 'Shruti\'s Company', '500', 'Mailed', 'Not Sent Yet', NULL, ''),
(91, 'ORD95873', '4237.96', '2024-09-21 07:52:24', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '1245545', 'https://Ekart/123456', '', '', 'Order has been cancelled by User', 'Ekart', '120', 'Mailed', 'Not Sent Yet', NULL, ''),
(92, 'ORD241558', '4237.96', '2024-09-21 12:55:44', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(93, 'ORD154713', '12131.560000000001', '2024-09-21 12:56:13', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(94, 'ORD793589', '693.98', '2024-09-21 15:05:35', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'shruti', 'shruti', '', '', 'Order has been cancelled by User', 'shruti', 'shruti', 'Mailed', 'Not Sent Yet', NULL, ''),
(95, 'ORD258990', '7677.66', '2024-09-22 08:56:26', 'Manav ', '8749328722', 31, 33, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Shipment entry is not available', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(96, 'ORD36178', '6322.78', '2024-09-22 09:05:06', 'Manav ', '8749328722', 31, 33, 'COD', 'Success', 'Delivered', 'Shipped', '121', 'https://ekart/123456', '', '', '', 'Ekart', '200', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(97, 'ORD488049', '1475', '2024-09-22 09:19:40', 'Manav ', '8749328722', 31, 33, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'AWB number is not available....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(98, 'ORD457979', '1475', '2024-09-22 09:20:03', 'Manav ', '8749328722', 31, 33, 'COD', 'Success', 'Delivered', 'Shipped', '2221', 'https://Delhivery/203', '', '', '', 'Delhivery', '123', 'Mailed', 'Not Sent Yet', NULL, ''),
(99, 'ORD615153', '13441.08', '2024-09-23 06:23:59', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(100, 'ORD157055', '738.06', '2024-09-23 06:28:31', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(101, 'ORD26157', '687.06', '2024-09-23 06:31:34', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'AWB number is not available....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(102, 'ORD930633', '966.06', '2024-09-23 06:45:12', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'AWB number is not available....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(103, 'ORD207203', '1079.56', '2024-09-23 06:52:32', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'testing 2', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(104, 'ORD831944', '160', '2024-09-23 06:57:12', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', '24/9/2024 cancel orders..', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(105, 'ORD335569', '119', '2024-09-23 07:09:36', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', '24/9/2024 cancel orders..', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(106, 'ORD526342', '160', '2024-09-23 07:12:53', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '121', 'https://Ekart/3011', '', '', '', 'Ekart', '200', 'Mailed', 'Not Sent Yet', NULL, ''),
(107, 'ORD145438', '160', '2024-09-23 07:14:10', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '13', '123', '', '', '', '11', '230', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(108, 'ORD710492', '452.98', '2024-09-23 07:30:21', 'Engineer Shayra', '', 25, 21, 'COD', 'Success', 'Delivered', 'Shipped', '123', '123', '', '', '', '1231', '122', 'Mailed', 'Not Sent Yet', NULL, ''),
(109, 'ORD352614', '515.06', '2024-09-23 07:39:29', 'Engineer Shayra', '', 26, 21, 'COD', 'COD Payment Not Received', 'New', 'Processing', '2341', 'https://delhivery/123', '', '', '', 'Delhivery', '120', 'Mailed', 'Not Sent Yet', NULL, ''),
(110, 'ORD923906', '771.4', '2024-09-23 08:13:57', 'Sagar Bhavel', '', 32, 26, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(111, 'ORD51235', '858.8', '2024-09-23 10:11:59', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'shipment is not available..', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(112, 'ORD79783', '1153.98', '2024-09-23 10:35:02', 'Shruti Sharma', '7987361186', 30, 19, 'COD', 'Success', 'Delivered', 'Shipped', '2343', 'https://trackingId/123', '', '', '', 'Delhivery', '50', 'Mailed', 'Not Sent Yet', NULL, ''),
(113, 'ORD255245', '102.1', '2024-09-23 12:24:26', 'Sagar Bhavel', '', 37, 26, 'COD', 'Success', 'Delivered', 'Shipped', '123456', 'https://Delhivery/12345', '', '', '', 'Delhivery', '500', 'Mailed', 'Not Sent Yet', NULL, ''),
(114, 'ORD408057', '1126.6', '2024-09-23 15:50:09', 'Shruti Sharma', '7987361186', 34, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Out of Stock Now..', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(115, 'ORD976795', '1726.6', '2024-09-23 15:57:28', 'Shruti Sharma', '7987361186', 34, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'AWB Number is not found...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(116, 'ORD338593', '1394.12', '2024-09-23 15:58:42', 'Engineer Shayra', '', 26, 21, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'AWB Number is not found...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(117, 'ORD701450', '797.06', '2024-09-23 16:15:17', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '123', 'https://xpressbees.com', '', '', '', 'Xpressbees', '200', 'Mailed', 'Not Sent Yet', NULL, ''),
(118, 'ORD509066', '5104.84', '2024-09-24 08:37:52', 'Shruti Sharma', '7987361186', 35, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'testing reason.', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(119, 'ORD667379', '5104.84', '2024-09-24 08:38:28', 'Shruti Sharma', '7987361186', 35, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'testing reason.', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(120, 'ORD709866', '5104.84', '2024-09-24 08:41:37', 'Shruti Sharma', '7987361186', 35, 19, 'COD', 'Pending', 'New', 'Processing', '123', 'https://Delhivery.com', '', '', '', 'Delhivery', '120', 'Mailed', 'Not Sent Yet', NULL, ''),
(121, 'ORD84660', '1663.97', '2024-09-24 08:43:37', 'Shruti Sharma', '7987361186', 34, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'meri marji....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(122, 'ORD963947', '2613.95', '2024-09-24 11:46:09', 'Sagar Bhavel', '', 37, 26, 'COD', 'Success', 'Delivered', 'Shipped', '1234', 'https://Delhivery.com', '', '', '', 'Delhivery', '200', 'Mailed', 'Not Sent Yet', NULL, ''),
(123, 'ORD701342', '2228.32', '2024-09-25 06:08:08', 'Sagar Bhavel', '', 37, 26, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'cancelled for checking', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(124, 'ORD201937', '1663.97', '2024-09-25 06:22:26', 'Shruti Sharma', '7987361186', 39, 35, 'COD', 'Pending', 'New', 'Processing', '', '26102000', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Mailed', 'Not Sent Yet', NULL, ''),
(125, 'ORD839189', '957.06', '2024-09-25 06:23:24', 'Engineer Shayra', '', 26, 21, 'COD', 'Success', 'Delivered', 'Shipped', '13121', 'https://xpressbees.com', '', '', '', 'XpressBees', '210', 'Mailed', 'Not Sent Yet', NULL, ''),
(126, 'ORD18471', '1778.96', '2024-09-25 06:24:07', 'Sagar Bhavel', '', 37, 26, 'COD', 'Pending', 'New', 'Processing', '', '30112002', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Mailed', 'Not Sent Yet', NULL, ''),
(127, 'ORD915903', '893.98', '2024-09-25 06:24:59', 'Shruti Sharma', '7987361186', 34, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'tadays\'s cancel...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(128, 'ORD658752', '948.28', '2024-09-25 12:40:44', 'Shruti Sharma', '7987361186', 44, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(129, 'ORD767198', '172.3', '2024-09-26 05:32:51', 'Shruti Sharma', '7987361186', 53, 19, 'COD', 'COD Payment Not Received', 'New', 'Processing', '12345', 'https://Ekart.com', '', '', '', 'Ekart', '20', 'Mailed', 'Not Sent Yet', NULL, ''),
(130, 'ORD288134', '172.3', '2024-09-26 05:40:04', 'Shruti Sharma', '7987361186', 53, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Array', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(131, 'ORD94', '160', '2024-09-26 05:51:38', 'waltzer India', '1234567891', 55, 39, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Array', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(132, 'ORD971846', '279', '2024-09-26 05:56:09', 'waltzer India', '1234567891', 55, 39, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '12345', 'https://ekart/com', '', '', 'Order has been cancelled by User', 'Ekart', '20', 'Mailed', 'Not Sent Yet', NULL, ''),
(133, 'ORD368800', '797.06', '2024-09-26 06:14:32', 'waltzer India', '1234567891', 55, 39, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Array', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(134, 'ORD643885', '641', '2024-09-26 06:53:19', 'waltzer India', '1234567891', 55, 39, 'COD', 'Pending', 'New', 'Processing', '', '3011', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(135, 'ORD248800', '1241', '2024-09-26 06:53:36', 'waltzer India', '1234567891', 55, 39, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', '', '', '', '', 'Testing Reason', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(136, 'ORD509711', '1.8688499999999997', '2024-09-27 07:56:36', 'Arjun bijlani', '9977823220', 56, 40, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-01', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(137, 'ORD960254', '21.7077', '2024-09-27 08:12:28', 'Arjun bijlani', '9977823220', 56, 40, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-02', '123456789', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(138, 'ORD718272', '1', '2024-09-27 09:33:09', 'Shruti Sharma', '7987361186', 53, 19, 'Prepaid', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-03', '75632', 'https://www.delhivery.com/', '', 'Order has been cancelled by User', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 05:38:46', ''),
(139, 'ORD833663', '78.79857', '2024-09-27 18:45:42', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-04', '', '', '', '145,636 cancel order...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(140, 'ORD938145', '61.597139999999996', '2024-09-27 18:51:32', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-05', '', '', '', '145,636 cancel order...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(141, 'ORD29537', '38.769', '2024-09-27 18:57:07', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-06', '5432', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 05:38:46', ''),
(142, 'ORD134289', '1996.6035', '2024-09-27 19:01:30', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-07', '2345', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 05:38:46', ''),
(143, 'ORD383806', '1331.069', '2024-09-28 05:13:16', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-08', '4321', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 05:38:46', ''),
(144, 'ORD469784', '1331.069', '2024-09-28 05:18:58', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-09', '453212321', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Mailed', 'Not Sent Yet', NULL, ''),
(145, 'ORD339815', '1331.069', '2024-09-28 05:28:39', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-10', '', '', '', 'meri marji....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(146, 'ORD375021', '2071.5823499999997', '2024-09-28 05:34:19', 'Shruti Sharma', '7987361186', 57, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-11', '', '', '', 'meri marji....', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(147, 'ORD249116', '2526.8351399999997', '2024-09-28 05:39:15', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-12', '', '', '', '145,636 cancel order...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(148, 'ORD580031', '1895.83242', '2024-09-30 05:36:42', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-13', '1234', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 05:38:46', ''),
(149, 'ORD992438', '2058.7063200000002', '2024-09-30 10:45:44', 'Shruti Sharma', '7987361186', 39, 35, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-14', '2666778716', 'https://www.xpressbees.com/track', '', '', 'Xpressbees', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 11:03:12', ''),
(150, 'ORD703034', '947.91621', '2024-09-30 10:46:41', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-15', '4280493102', 'https://www.xpressbees.com/track', '', '', 'Xpressbees', '', 'Mailed', 'Not Sent Yet', '2024-09-30 11:03:12', ''),
(151, 'ORD606590', '1423.4332200000001', '2024-09-30 10:47:32', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-16', '2353901880', 'https://www.xpressbees.com/track', '', '', 'Xpressbees', '', 'Mailed', 'Not Sent Yet', '2024-09-30 11:03:12', ''),
(152, 'ORD684336', '1431.288', '2024-09-30 10:48:27', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-17', '0574281003', 'https://www.xpressbees.com/track', '', '', 'Xpressbees', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-09-30 11:03:12', ''),
(153, 'ORD502432', '1702.83514', '2024-09-30 10:50:07', 'Engineer Shayra', '', 26, 21, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-18', '4568479376', 'https://www.xpressbees.com/track', '', '', 'Xpressbees', '', 'Mailed', 'Not Sent Yet', '2024-09-30 11:03:12', ''),
(154, 'ORD111570', '2422.87724', '2024-09-30 15:49:31', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-19', '30112002', 'https://ekartlogistics.com/', '', '', 'eKartLogistics', '', 'Mailed', 'Not Sent Yet', '2024-09-30 16:35:45', ''),
(155, 'ORD548900', '3608.4381399999997', '2024-09-30 16:24:33', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-20', '12323434', 'https://ekartlogistics.com/', '', '', 'eKartLogistics', '', 'Mailed', 'Not Sent Yet', '2024-09-30 16:35:45', ''),
(156, 'ORD823172', '6040.30419', '2024-09-30 18:24:11', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-21', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(157, 'ORD612419', '2489.2731', '2024-10-01 06:59:13', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-22', '11223344', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Mailed', 'Not Sent Yet', '2024-10-01 09:45:49', ''),
(158, 'ORD807370', '5772.913100000001', '2024-10-01 08:02:44', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-23', '11234566', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Mailed', 'Not Sent Yet', '2024-10-01 09:45:49', ''),
(159, 'ORD210854', '1386.9361999999999', '2024-10-01 10:28:23', 'Sagar Bhavel', '', 60, 26, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-24', '', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(160, 'ORD303384', '1627.606', '2024-10-02 09:43:00', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-25', 'TRACk12345', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Mailed', 'Not Sent Yet', '2024-10-02 09:54:30', ''),
(161, 'ORD4857', '49.5945', '2024-10-02 10:00:44', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-26', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(162, 'ORD555918', '699.988', '2024-10-02 10:01:18', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-27', '1234325', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Mailed', 'Not Sent Yet', '2024-10-02 10:05:49', ''),
(163, 'ORD862872', '171.1345', '2024-10-02 10:17:41', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-28', '321331', 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '', '', 'India Post', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-03 19:52:47', ''),
(164, 'ORD956817', '665.5345', '2024-10-02 10:21:31', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-29', '231231', 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '', '', 'India Post', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-03 19:52:47', ''),
(165, 'ORD217308', '2389.4970000000003', '2024-10-02 10:25:29', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-30', '12355', 'https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '', '', 'India Post', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-03 19:52:47', ''),
(166, 'ORD255877', '977.5925699999999', '2024-10-02 15:18:09', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-31', '', '', '', 'meri marji...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(167, 'ORD547239', '532.1175699999999', '2024-10-02 15:23:20', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-32', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(168, 'ORD930558', '532.1175699999999', '2024-10-02 15:27:09', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-33', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(169, 'ORD493479', '532.1175699999999', '2024-10-02 15:31:35', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-34', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(170, 'ORD29672', '645.4979099999999', '2024-10-02 15:35:32', 'Shruti Sharma', '7987361186', 57, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-35', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(171, 'ORD527263', '645.4979099999999', '2024-10-02 15:36:42', 'Shruti Sharma', '7987361186', 57, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-36', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(172, 'ORD643659', '532.1175699999999', '2024-10-02 17:37:03', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-37', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(173, 'ORD309147', '532.1175699999999', '2024-10-02 17:40:18', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-38', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(174, 'ORD384164', '532.1175699999999', '2024-10-02 18:03:50', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-39', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(175, 'ORD501010', '532.1175699999999', '2024-10-02 18:05:12', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-40', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(176, 'ORD918470', '532.1175699999999', '2024-10-02 18:17:57', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-41', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(177, 'ORD383936', '1171.18931', '2024-10-03 06:44:28', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-42', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(178, 'ORD547656', '1171.18931', '2024-10-03 07:09:37', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-43', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(179, 'ORD822905', '1171.18931', '2024-10-03 07:12:02', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-44', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(180, 'ORD223091', '1171.18931', '2024-10-03 07:16:16', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-45', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(181, 'ORD955298', '1171.18931', '2024-10-03 07:19:28', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-46', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(182, 'ORD493542', '1316.0763200000001', '2024-10-03 07:32:37', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-47', '', '', '', 'Courier service is not available...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(183, 'ORD630796', '1316.0763200000001', '2024-10-03 07:35:18', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-48', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(184, 'ORD3507', '1316.0763200000001', '2024-10-03 07:36:51', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-49', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(185, 'ORD310759', '1316.0763200000001', '2024-10-03 07:38:16', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-50', '', '', '', 'testing reason...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(186, 'ORD641611', '165.10385', '2024-10-03 07:39:44', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-51', '', '', '', 'testing reason...', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(187, 'ORD154416', '583.6175699999999', '2024-10-03 09:44:47', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-52', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, ''),
(188, 'ORD610611', '49.5945', '2024-10-03 17:22:37', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-53', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(189, 'ORD370666', '698.41931', '2024-10-03 17:26:13', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-54', '123345', 'https://www.dtdc.in/trace.asp', '', '', 'DTDC', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-03 18:15:00', '338.077'),
(190, 'ORD283326', '1448.64762', '2024-10-03 17:40:17', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-55', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '770.454'),
(191, 'ORD773766', '706.8889999999999', '2024-10-03 17:44:08', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-56', '121345', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Mailed', 'Not Sent Yet', '2024-10-03 17:58:43', '94.3'),
(192, 'ORD986767', '965.4704999999999', '2024-10-04 10:41:24', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-57', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '424.35'),
(193, 'ORD329979', '353.44449999999995', '2024-10-04 15:25:48', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-58', '123456789', 'https://www.bluedart.com/', '', '', 'Blue Dart', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-04 18:50:24', '47.15'),
(194, 'ORD1025', '393.0788999999999', '2024-10-04 17:11:29', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-59', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(195, 'ORD587030', '786.1577999999998', '2024-10-04 17:48:09', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-60', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '94.3'),
(196, 'ORD754180', '1273.8009999999997', '2024-10-04 18:43:11', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-61', '53453423', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-04 19:02:15', '565.8'),
(197, 'ORD173961', '7446.8072999999995', '2024-10-05 06:05:18', 'Sagar Bhavel', '', 60, 26, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-62', '213433', 'https://www.ecomexpress.in/tracking/', '', '', 'ecomExpress', '', 'Mailed', 'Not Sent Yet', '2024-10-05 06:29:30', '565.8'),
(198, 'ORD212667', '193.1971', '2024-10-05 06:13:25', 'Sagar Bhavel', '', 45, 26, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-63', 'Sagar5102024', 'https://www.fedex.com/en-us/tracking.html', '', '', 'FedEx', '', 'Mailed', 'Not Sent Yet', '2024-10-05 06:17:26', '47.15'),
(199, 'ORD729475', '7446.8072999999995', '2024-10-05 06:56:32', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-64', '3423', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-05 08:48:49', '565.8'),
(200, 'ORD686959', '3397.142395', '2024-10-05 07:28:28', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-65', '434', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-10-05 08:48:49', '565.8'),
(201, 'ORD978347', '1027.1675', '2024-10-05 08:27:52', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-66', '232', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Mailed', 'Not Sent Yet', '2024-10-05 08:48:49', '424.35'),
(202, 'ORD116870', '1181.2608559999999', '2024-10-05 08:53:17', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-67', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '0'),
(203, 'ORD602298', '1027.1675', '2024-10-05 09:02:44', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-68', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '424.35'),
(204, 'ORD83668', '786.1577999999998', '2024-10-05 10:14:06', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-69', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '94.3'),
(205, 'ORD32718', '2313.2527950000003', '2024-10-05 10:15:52', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-70', '', '', '', 'testing Reason', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '128.8'),
(206, 'ORD864409', '1027.1675', '2024-10-05 10:24:37', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-71', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '424.35'),
(207, 'ORD70600', '639.7383560000001', '2024-10-05 12:24:57', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-72', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(208, 'ORD422619', '2313.2527950000003', '2024-10-05 13:31:28', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-73', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '128.8'),
(209, 'ORD142416', '8389.881995', '2024-10-05 13:54:33', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-74', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '4088.02'),
(210, 'ORD987517', '1958.292856', '2024-10-05 16:30:46', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-75', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '754.4');
INSERT INTO `checkout` (`Id`, `OrderId`, `price`, `timestamp`, `customerName`, `phone`, `addressId`, `userId`, `paymode`, `payment_status`, `order_status`, `shipping_status`, `invoiceNo`, `trackingId`, `trackingURL`, `fssai`, `cancel_reason`, `courier_company`, `courier_charges`, `trackingIdmail`, `invoicemail`, `Shipping_date`, `deliveryCharges`) VALUES
(211, 'ORD268536', '3511.426045', '2024-10-13 07:36:54', 'Sarovi Intern', '12345678790', 59, 41, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-76', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '551.655'),
(212, 'ORD245901', '407.64824999999996', '2024-10-13 10:25:04', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-77', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(213, 'ORD891991', '393.0788999999999', '2024-10-13 10:32:15', 'Shruti Sharma', '7987361186', 58, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-78', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(214, 'ORD231241', '407.64824999999996', '2024-10-13 10:33:34', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-79', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(215, 'ORD669192', '407.64824999999996', '2024-10-13 10:37:45', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-80', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(216, 'ORD998452', '407.64824999999996', '2024-10-13 10:48:13', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-81', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(217, 'ORD553748', '407.64824999999996', '2024-10-13 10:48:47', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-82', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(218, 'ORD360198', '407.64824999999996', '2024-10-13 10:51:13', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-83', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(219, 'ORD870701', '407.64824999999996', '2024-10-13 10:51:59', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-84', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(220, 'ORD357051', '64.16385', '2024-10-15 16:18:10', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-85', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(221, 'ORD961614', '64.16385', '2024-10-15 16:26:24', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-86', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(222, 'ORD98124', '64.16385', '2024-10-15 16:26:55', 'Shruti Sharma', '7987361186', 61, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-87', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(223, 'ORD383978', '62.294999999999995', '2024-10-18 10:01:39', 'Shruti Sharma', '7987361186', 61, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-88', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(224, 'ORD194102', '62.294999999999995', '2024-10-18 10:07:55', 'Shruti Sharma', '7987361186', 61, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-89', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(225, 'ORD290080', '62.294999999999995', '2024-10-18 12:23:35', 'Shruti Sharma', '7987361186', 61, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-90', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(226, 'ORD50638', '62.294999999999995', '2024-10-18 13:00:59', 'Shruti Sharma', '7987361186', 61, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-91', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(227, 'ORD231852', '62.294999999999995', '2024-10-19 12:53:38', 'Shruti Sharma', '7987361186', 17, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-92', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(228, 'ORD866583', '48.15', '2024-10-21 11:33:30', 'Shruti Dinesh Sharma', '1234567890', 17, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-93', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(229, 'ORD32842', '49.5945', '2024-10-22 12:02:29', 'Shruti Dinesh Sharma', '1234567811', 17, 19, 'COD', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-94', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(230, 'ORD565996', '393.0788999999999', '2024-10-24 12:32:34', 'Shruti Sharma', '7987361186', 17, 19, 'COD', 'COD Payment Not Received', 'Delivered', 'Shipped', 'Waltzify-95', '1234345', 'https://www.dhl.com/en/express/tracking.html', '', '', 'DHL', '', 'Mailed', 'Not Sent Yet', '2024-10-24 12:58:34', '47.15'),
(231, 'ORD16275', '381.62999999999994', '2024-10-24 12:33:45', 'Shruti Sharma', '7987361186', 17, 19, 'Prepaid', 'Cancelled', 'Cancelled', 'Cancelled', 'Waltzify-96', '', '', '', 'Order has been cancelled by User', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(232, 'ORD831611', '381.62999999999994', '2024-11-03 12:55:04', 'Shruti Dinesh Sharma', '7987361186', 63, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-97', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(233, 'ORD514120', '393.0788999999999', '2024-11-03 12:57:55', 'Shruti Dinesh Sharma', '7987361186', 63, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-98', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(234, 'ORD258866', '381.62999999999994', '2024-11-03 13:01:05', 'Shruti Dinesh Sharma', '7987361186', 63, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-99', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(235, 'ORD935566', '381.62999999999994', '2024-11-03 13:32:52', 'Shruti Dinesh Sharma', '7987361186', 63, 19, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-100', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '47.15'),
(236, 'ORD589976', '786.1577999999998', '2024-11-04 10:58:47', 'Suman', '7987361186', 63, 19, 'COD', 'Pending', 'New', 'Pending', 'Waltzify-101', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '94.3'),
(237, 'ORD694278', '1906.3755', '2024-11-05 08:52:32', 'Shruti', '7987361186', 63, 19, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-102', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '101.2'),
(238, 'ORD122921', '1934.8035', '2024-11-06 10:03:10', 'Shruti', '7987361186', 65, 55, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-103', '6655757', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Mailed', 'Not Sent Yet', '2024-11-06 10:08:07', '128.8'),
(239, 'ORD680821', '160.98385', '2024-11-06 10:54:11', 'Shruti', '7987361186', 65, 55, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-104', '655656', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Mailed', 'Not Sent Yet', '2024-11-06 11:09:17', '61.295'),
(240, 'ORD680075', '1878.45', '2024-11-06 11:29:39', 'Shruti', '7987361186', 65, 55, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-105', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '128.8'),
(241, 'ORD26491', '3869.607', '2024-11-07 16:54:17', 'Shruti', '7987361186', 65, 55, 'COD', 'COD Payment Not Received', 'Delivered', 'Shipped', 'Waltzify-106', '756758758', 'https://www.bluedart.com/', '', '', 'Blue Dart', '', 'Mailed', 'Not Sent Yet', '2024-11-07 17:11:10', '257.6'),
(242, 'ORD200105', '1934.8035', '2024-11-07 17:22:22', 'Shruti', '7987361186', 65, 55, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-107', '644636363', 'https://www.ecomexpress.in/tracking/', '', '', 'ecomExpress', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-11-07 17:24:40', '128.8'),
(243, 'ORD995647', '1934.8035', '2024-11-12 03:01:24', 'Shruti', '7987361186', 65, 55, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-108', '786646e353534', 'https://www.bluedart.com/', '', '', 'Blue Dart', '', 'Mailed', 'Not Sent Yet', '2024-11-12 03:03:10', '128.8'),
(244, 'ORD879329', '1934.8035', '2024-11-15 06:20:17', 'Shruti', '7987361186', 65, 55, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-109', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '128.8'),
(245, 'ORD21407', '1586.7098500000002', '2024-11-20 07:05:03', 'Shruti Sharma', '7987361186', 66, 2, 'COD', 'Success', 'Delivered', 'Shipped', 'Waltzify-110', '12345667', 'https://www.delhivery.com/', '', '', 'Delhivery', '', 'Email Not Sent Yet', 'Not Sent Yet', '2024-11-20 07:05:57', '61.295'),
(246, 'ORD603968', '157.295', '2024-11-22 08:07:33', 'Shruti Sharma', '7987361186', 66, 2, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-111', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(247, 'ORD12653', '157.295', '2024-11-22 08:08:27', 'Shruti Sharma', '7987361186', 66, 2, 'Prepaid', 'Pending', 'New', 'Pending', 'Waltzify-112', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '61.295'),
(248, 'ORD256205', '852.91931', '2024-12-09 06:39:44', 'Shruti Sharma', '7987361186', 11, 8, 'COD', 'Pending', 'New', 'Processing', 'Waltzify-113', '', '', '', '', '', '', 'Email Not Sent Yet', 'Not Sent Yet', NULL, '338.077');

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `Id` int(11) NOT NULL,
  `collectionName` varchar(300) NOT NULL,
  `images1` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`Id`, `collectionName`, `images1`) VALUES
(2, 'Civil Lab Equipments', 'civillab.jpg'),
(3, 'Snake Catcher Sticks and Hooks', 'Safety Product.jpg'),
(4, 'Search and Rescue', 'Search & Rescue.jpg'),
(5, 'Snake Garden Tools', 'Snake & Garden Tool.jpg'),
(17, 'Safety Products', '51O-kXCzXfL._SX466_.jpg'),
(18, 'Waltzer', 'Group 448.png'),
(19, 'shruti', 'c6a081130f85cfc15940dad5308e6ef7.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `Id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`Id`, `first_name`, `last_name`, `email`, `phone`, `subject`, `message`, `created_at`, `status`) VALUES
(1, 'Aashu', 'Gupta', 'aashu@gmail.com', '9758395734', 'Query', 'Hello, This is Aashu Gupta, I have a question, Actually i want to know that how many types of silica gel products you have?', '2024-08-22 09:44:06', 'Solved'),
(2, 'Gopi', 'Modi', 'gopi@gmail.com', '8378932291', 'Complaint', 'Hello, I am facing a problem ,while payment, please help me.', '2024-08-22 10:03:07', 'Solved'),
(4, 'Sushila ', 'Bansal', 'sushila@gmail.com', '123456789', 'Query', 'Hello, This is Sushila Bansal, I have a question, Actually i want to know that how many types of silica gel products you have?', '2024-08-22 10:11:01', 'Solved'),
(5, 'Shruti', 'Sharma', 'shruti.sarovi@gmail.com', '7555332222', 'Query', 'Hello, I am Shruti Sharma this side. I have one question , do you have any cages for parrots.', '2024-10-14 14:11:12', 'Solved'),
(6, 'Shruti', 'Sharma', 'er.shrutidsharma@gmail.com', '7293823323', 'Complaint', 'I have received very bad product..', '2024-10-14 14:15:21', 'Solved'),
(7, 'Taarak', 'Mehta', 'taarakmehta@gmail.com', '8932833437', 'Query', 'Hello, I am Taarak Mehta this side. I have one question , do you have any cages for  Mice', '2024-10-14 14:22:55', 'Solved'),
(8, 'Megha ', 'Yadav', 'yadavmegha@gmail.com', '7293823323', 'Return/Refund', 'I dont like this product ,i want to change it..', '2024-10-14 14:28:13', 'Solved'),
(9, 'Vishal ', 'Soni', 'vishal@gmail.com', '7848322631', 'Query', 'Hiii, when will i get my product', '2024-10-24 07:04:38', 'Pending'),
(10, 'Neha ', 'Joshi', 'nehaj@gmail.com', '1234567890', 'Query', 'Hiii, when will i get my product.', '2024-10-24 07:11:09', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `defaultbanner`
--

CREATE TABLE `defaultbanner` (
  `Id` int(11) NOT NULL,
  `location` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defaultbanner`
--

INSERT INTO `defaultbanner` (`Id`, `location`, `image`) VALUES
(1, 'Home Page', 'contractors.jpg.jpg'),
(2, 'New Arrival', 'E-commerce-Product-Banner-Design-scaled.jpg'),
(3, 'New Arrival', 'maxresdefault.jpg'),
(4, 'Home Page', 'image_processing20201114-29431-cxvyn6.JPG'),
(5, 'Home Page', 'maxresdefault.jpg'),
(6, 'Home Page', 'maxresdefault.jpg'),
(7, 'Home Page', 'maxresdefault.jpg'),
(8, 'Home Page', 'Strength & Innovation for Industrial Excellence! (1).jpg'),
(9, 'Home Page', 'gradient-horizontal-banner-template-diwali-hindu-festival-celebration_23-2150874937.avif'),
(10, 'Home Page', 'e-commerce-concept-youtube-banner_23-2151243609.jpg'),
(11, 'Home Page', 'e-commerce-concept-youtube-banner_23-2151243609-fotor-20241027112951.jpg'),
(13, 'Home Page', 'Strength & Innovation for Industrial Excellence! (3).jpg'),
(14, 'Home Page', 'Safety-Products_enhanced.webp'),
(15, 'Home Page', 'Strength & Innovation for Industrial Excellence! (3).jpg'),
(16, 'Home Page', 'Safety-Products_enhanced.webp'),
(17, 'Home Page', 'Strength & Innovation for Industrial Excellence! (3).jpg'),
(18, 'Home Page', 'Strength & Innovation for Industrial Excellence! (4).jpg'),
(19, 'Home Page', '2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `defaultbannernew`
--

CREATE TABLE `defaultbannernew` (
  `Id` int(11) NOT NULL,
  `location` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defaultbannernew`
--

INSERT INTO `defaultbannernew` (`Id`, `location`, `image`) VALUES
(1, 'New Arrival', 'maxresdefault.jpg'),
(2, 'New Arrival', 'contractors.jpg.jpg'),
(3, 'New Arrival', 'AdobeStock_964531195_Preview.jpg'),
(4, 'New Arrival', 'Starting-799_3B_PC_Hero_3000x1200._CB543529790_.jpg'),
(5, 'New Arrival', 'Untitled design (2).jpg'),
(6, 'New Arrival', 'Safety-Products_enhanced.webp'),
(7, 'New Arrival', 'Strength & Innovation for Industrial Excellence! (4).jpg'),
(8, 'New Arrival', '3d-yellow-great-discount-sale-260nw-2056851839.webp'),
(9, 'New Arrival', 'download.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `deliverycompany`
--

CREATE TABLE `deliverycompany` (
  `Id` int(11) NOT NULL,
  `Courier_Company` varchar(500) NOT NULL,
  `Tracking_URL` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliverycompany`
--

INSERT INTO `deliverycompany` (`Id`, `Courier_Company`, `Tracking_URL`) VALUES
(1, 'Delhivery', 'https://www.delhivery.com/'),
(2, 'Blue Dart', 'https://www.bluedart.com/'),
(3, 'DHL', 'https://www.dhl.com/en/express/tracking.html'),
(4, 'DTDC', 'https://www.dtdc.in/trace.asp'),
(5, 'ecomExpress', 'https://www.ecomexpress.in/tracking/'),
(6, 'eKart Logistics', 'https://ekartlogistics.com/');

-- --------------------------------------------------------

--
-- Table structure for table `newarrival`
--

CREATE TABLE `newarrival` (
  `newArrival_Id` int(11) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `link_url` varchar(1000) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newarrival`
--

INSERT INTO `newarrival` (`newArrival_Id`, `image`, `link_url`, `start_date`, `end_date`) VALUES
(1, 'New Arrival Banner.jpg', '/newarrival', '2024-06-28', '2024-06-28'),
(2, 'new-arrival-banner-template-yellow-blue-colors-vector-44784986.jpg', '/newarrival', '2024-06-28', '2024-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `newarrivalbanner`
--

CREATE TABLE `newarrivalbanner` (
  `Id` int(11) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newarrivalbanner`
--

INSERT INTO `newarrivalbanner` (`Id`, `image`, `start_date`, `end_date`) VALUES
(1, 'construction-land-surveyor-site-inspection-600nw-2211536107.jpg', '2024-06-28', '2024-08-21'),
(2, 'New Arrival Banner.jpg', '2024-06-28', '2024-07-12'),
(3, 'contractors.jpg.jpg', '2024-08-20', '2024-08-20'),
(4, 'AdobeStock_964531195_Preview.jpg', '2024-10-28', '2024-10-28'),
(5, 'Safety-Products_enhanced.webp', '2024-11-05', '2024-11-05'),
(6, 'download.jfif', '2024-11-12', '2024-11-12');

-- --------------------------------------------------------

--
-- Table structure for table `oneproduct`
--

CREATE TABLE `oneproduct` (
  `Id` int(11) NOT NULL,
  `pname` varchar(500) NOT NULL,
  `category` varchar(500) NOT NULL,
  `brand` varchar(1000) NOT NULL,
  `description` text NOT NULL,
  `img1` varchar(1000) NOT NULL,
  `img2` varchar(1000) NOT NULL,
  `img3` varchar(1000) NOT NULL,
  `img4` varchar(1000) NOT NULL,
  `size` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `endDate` date NOT NULL,
  `p_price` varchar(100) NOT NULL,
  `discount` int(11) NOT NULL,
  `p_rate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `oneproduct`
--

INSERT INTO `oneproduct` (`Id`, `pname`, `category`, `brand`, `description`, `img1`, `img2`, `img3`, `img4`, `size`, `date`, `endDate`, `p_price`, `discount`, `p_rate`) VALUES
(1, 'Silica Gel', 'Silica Gel', 'Waltzer India', 'Appearance: Silica gel is typically found in the form of small, translucent, or semi-transparent beads or granules. It is available in various sizes and shapes to suit different applications.\r\nFunction: Silica gel is primarily used to absorb moisture and humidity from its surroundings. It prevents the growth of mold, mildew, and other forms of moisture-related damage in various products, such as electronics, leather goods, pharmaceuticals, food packaging, and more.\r\nAdsorption: Silica gel works by adsorbing (not absorbing) water vapor. When placed in a humid environment, the silica gel beads attract and trap moisture molecules on their surfaces. This helps maintain a dry atmosphere, preventing damage and deterioration caused by excess moisture.', 'silica.jpg', 'silica.jpg', 'silica.jpg', 'silica.jpg', '100 gm', '2024-07-01', '2024-07-05', '300', 5, 5),
(2, 'Welding Equipments Assessories', 'Safety Products', 'Waltzer India', 'It is very nice safety products for hands. ', 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg', '', '2024-07-06', '2024-09-12', '500', 0, 5),
(3, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 'Silica Gel', 'Waltzer India', 'Quantity : 4 (EACH 250 GRAM Packets )\r\nMoisture absorbers for Madisin Tablet and food storage.\r\nOld photos won’t stick by the help of Silica Gel Desiccant\r\nThese pouches absorb moisture and provide de-moist conditions for all the components where they are placed.\r\nIt can also be used to protect leather jackets, shoes / boots, photograph albums, computer media storage, electronics Car,Camera, Lenses.\r\nMade in India', '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '', '0000-00-00', '0000-00-00', '1000', 58, 5),
(4, 'Silica Gel', 'Silica Gel', 'Waltzer India', 'It is very nice product, with high quality.', 'Silica Gel.jpg', 'Silica Gel.jpg', 'Silica Gel.jpg', 'Silica Gel.jpg', '', '0000-00-00', '0000-00-00', '500', 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `Id` int(11) NOT NULL,
  `OrderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productName` varchar(500) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` varchar(500) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`Id`, `OrderId`, `productId`, `productName`, `quantity`, `price`, `timestamp`) VALUES
(1, 1, 48, 'chocolate', 1, '1', '2024-09-04 17:29:45'),
(2, 2, 48, 'chocolate', 1, '501', '2024-09-05 03:25:02'),
(3, 2, 40, 'Liberty Warrior 98-02-SSBA High Ankle Safety Shoes ', 1, '501', '2024-09-05 03:25:02'),
(4, 3, 47, 'test1', 1, '154', '2024-09-05 06:01:29'),
(5, 4, 15, 'Rahul Professionals Safety Helmet with Hard Hat ', 1, '400', '2024-09-06 08:28:50'),
(6, 5, 15, 'Rahul Professionals Safety Helmet with Hard Hat ', 1, '400', '2024-09-06 10:56:46'),
(7, 6, 49, 'test', 2, '620', '2024-09-07 10:27:44'),
(8, 6, 27, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '620', '2024-09-07 10:27:44'),
(9, 7, 49, 'test', 2, '620', '2024-09-07 10:31:54'),
(10, 7, 27, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '620', '2024-09-07 10:31:54'),
(11, 8, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 10:43:59'),
(12, 9, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 10:45:01'),
(13, 10, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 10:52:56'),
(14, 11, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 11:08:54'),
(15, 12, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 11:15:10'),
(16, 13, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-09-07 11:23:45'),
(17, 14, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-07 11:30:14'),
(18, 15, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-07 11:39:28'),
(19, 16, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-07 11:44:19'),
(20, 20, 26, 'product1', 1, '500', '2024-09-07 11:51:38'),
(21, 21, 47, 'test1', 1, '154', '2024-09-07 11:54:36'),
(22, 22, 47, 'test1', 1, '154', '2024-09-07 11:57:38'),
(23, 23, 47, 'test1', 1, '154', '2024-09-07 12:02:50'),
(24, 24, 47, 'test1', 1, '154', '2024-09-07 12:09:46'),
(25, 25, 47, 'test1', 1, '154', '2024-09-07 12:23:15'),
(26, 26, 47, 'test1', 1, '154', '2024-09-07 12:30:11'),
(27, 27, 47, 'test1', 1, '154', '2024-09-07 12:31:44'),
(28, 28, 47, 'test1', 1, '154', '2024-09-07 12:36:01'),
(29, 29, 47, 'test1', 1, '154', '2024-09-07 12:38:11'),
(30, 30, 47, 'test1', 1, '154', '2024-09-07 12:38:38'),
(31, 31, 47, 'test1', 1, '154', '2024-09-07 12:41:05'),
(32, 32, 47, 'test1', 1, '154', '2024-09-07 12:44:16'),
(33, 33, 47, 'test1', 1, '154', '2024-09-07 12:47:40'),
(34, 34, 47, 'test1', 1, '154', '2024-09-07 12:51:27'),
(35, 35, 47, 'test1', 1, '154', '2024-09-07 12:53:52'),
(36, 36, 47, 'test1', 1, '154', '2024-09-07 13:04:00'),
(37, 37, 47, 'test1', 1, '154', '2024-09-07 13:06:24'),
(38, 38, 47, 'test1', 1, '154', '2024-09-07 17:08:22'),
(39, 39, 47, 'test1', 1, '154', '2024-09-07 17:09:29'),
(40, 40, 47, 'test1', 1, '154', '2024-09-07 17:21:08'),
(41, 41, 47, 'test1', 1, '154', '2024-09-07 17:22:20'),
(42, 42, 47, 'test1', 1, '154', '2024-09-07 17:42:27'),
(43, 43, 47, 'test1', 1, '154', '2024-09-07 17:43:42'),
(44, 44, 47, 'test1', 1, '154', '2024-09-07 17:44:40'),
(45, 45, 47, 'test1', 1, '154', '2024-09-07 18:06:22'),
(46, 46, 47, 'test1', 1, '154', '2024-09-07 18:13:31'),
(47, 47, 47, 'test1', 1, '154', '2024-09-07 18:15:43'),
(48, 48, 47, 'test1', 1, '154', '2024-09-07 18:17:09'),
(49, 49, 47, 'test1', 1, '154', '2024-09-07 18:18:30'),
(50, 50, 47, 'test1', 1, '154', '2024-09-07 18:19:44'),
(51, 51, 47, 'test1', 1, '154', '2024-09-07 18:20:39'),
(52, 52, 47, 'test1', 1, '154', '2024-09-07 18:22:39'),
(53, 53, 47, 'test1', 1, '154', '2024-09-07 18:23:20'),
(54, 54, 47, 'test1', 1, '154', '2024-09-07 18:24:18'),
(55, 55, 47, 'test1', 1, '154', '2024-09-07 18:27:52'),
(56, 56, 47, 'test1', 1, '154', '2024-09-07 18:30:42'),
(57, 57, 47, 'test1', 1, '154', '2024-09-07 18:40:24'),
(58, 58, 47, 'test1', 1, '154', '2024-09-07 18:45:35'),
(59, 59, 47, 'test1', 1, '154', '2024-09-07 18:51:23'),
(60, 60, 47, 'test1', 1, '154', '2024-09-07 18:52:01'),
(61, 61, 47, 'test1', 1, '154', '2024-09-07 19:05:27'),
(62, 62, 47, 'test1', 1, '154', '2024-09-07 19:08:03'),
(63, 63, 48, 'chocolate', 1, '1', '2024-09-09 07:01:25'),
(64, 64, 48, 'chocolate', 2, '2', '2024-09-10 06:42:53'),
(65, 65, 48, 'chocolate', 1, '1', '2024-09-10 08:35:11'),
(66, 66, 48, 'chocolate', 1, '1', '2024-09-11 11:51:14'),
(67, 67, 48, 'chocolate', 2, '502', '2024-09-11 11:58:55'),
(68, 67, 20, 'G Lab Compound Student Microscope with LED ', 1, '502', '2024-09-11 11:58:55'),
(69, 68, 48, 'chocolate', 1, '1001', '2024-09-11 12:08:35'),
(70, 68, 20, 'G Lab Compound Student Microscope with LED ', 2, '1001', '2024-09-11 12:08:35'),
(71, 69, 48, 'chocolate', 2, '1002', '2024-09-11 12:44:26'),
(72, 69, 20, 'G Lab Compound Student Microscope with LED ', 2, '1002', '2024-09-11 12:44:26'),
(73, 70, 48, 'chocolate', 1, '501', '2024-09-11 12:45:28'),
(74, 70, 20, 'G Lab Compound Student Microscope with LED ', 1, '501', '2024-09-11 12:45:28'),
(75, 71, 48, 'chocolate', 1, '501', '2024-09-11 12:45:45'),
(76, 71, 20, 'G Lab Compound Student Microscope with LED ', 1, '501', '2024-09-11 12:45:45'),
(77, 72, 48, 'chocolate', 1, '501', '2024-09-11 12:48:55'),
(78, 72, 20, 'G Lab Compound Student Microscope with LED ', 1, '501', '2024-09-11 12:48:55'),
(79, 73, 48, 'chocolate', 1, '1', '2024-09-12 07:59:32'),
(80, 74, 48, 'chocolate', 1, '401', '2024-09-13 05:24:52'),
(81, 74, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '401', '2024-09-13 05:24:52'),
(82, 75, 48, 'chocolate', 1, '801', '2024-09-13 06:46:40'),
(83, 75, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 2, '801', '2024-09-13 06:46:40'),
(84, 76, 48, 'chocolate', 1, '401', '2024-09-14 07:37:25'),
(85, 76, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '401', '2024-09-14 07:37:25'),
(86, 77, 48, 'chocolate', 1, '401', '2024-09-17 10:00:17'),
(87, 77, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '401', '2024-09-17 10:00:17'),
(88, 78, 45, 'QADAR Executive Safety Jacket, Multi-Purpose Safety Jacket With 4 Pockets.', 1, '320', '2024-09-19 11:15:09'),
(89, 79, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '512.46', '2024-09-19 12:00:22'),
(90, 80, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '512.46', '2024-09-19 15:39:44'),
(91, 81, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '512.46', '2024-09-19 16:14:07'),
(92, 82, 8, 'Reusable Heavy Duty Industrial Safety Gloves', 3, '1328', '2024-09-19 16:17:02'),
(93, 82, 7, 'Daz Cam Safety Hard Head White Helmet ', 2, '1328', '2024-09-19 16:17:02'),
(94, 83, 8, 'Reusable Heavy Duty Industrial Safety Gloves', 1, '542.5', '2024-09-20 05:04:02'),
(95, 83, 7, 'Daz Cam Safety Hard Head White Helmet ', 1, '542.5', '2024-09-20 05:04:02'),
(96, 85, 7, 'Daz Cam Safety Hard Head White Helmet ', 1, '599', '2024-09-20 05:47:13'),
(97, 85, 11, 'Amazon Basics Ds-Cjamz2010 12-In-1 Magnetic Ratchet Screwdriver (Blue) - 1 pc', 1, '1000', '2024-09-20 05:47:13'),
(98, 86, 7, 'Daz Cam Safety Hard Head White Helmet ', 1, '299.5', '2024-09-20 05:57:19'),
(99, 86, 11, 'Amazon Basics Ds-Cjamz2010 12-In-1 Magnetic Ratchet Screwdriver (Blue) - 1 pc', 1, '660', '2024-09-20 05:57:19'),
(100, 87, 11, 'Amazon Basics Ds-Cjamz2010 12-In-1 Magnetic Ratchet Screwdriver (Blue) - 1 pc', 2, '660', '2024-09-20 06:05:11'),
(101, 87, 13, 'B4 Viscometer | Portable Brass Cup B-4 Liquid Flow', 1, '1249.5', '2024-09-20 06:05:11'),
(102, 88, 13, 'B4 Viscometer | Portable Brass Cup B-4 Liquid Flow', 2, '2499', '2024-09-20 06:11:45'),
(103, 88, 24, 'Calculator', 1, '500', '2024-09-20 06:11:45'),
(104, 89, 13, 'B4 Viscometer | Portable Brass Cup B-4 Liquid Flow', 2, '2499', '2024-09-20 06:19:39'),
(105, 89, 24, 'Calculator', 3, '1500', '2024-09-20 06:19:39'),
(106, 90, 24, 'Calculator', 1, '500', '2024-09-20 10:24:07'),
(107, 90, 17, 'Led Lighted Pocket Microscope ', 2, '6300', '2024-09-20 10:24:07'),
(108, 91, 24, 'Calculator', 1, '500', '2024-09-21 07:52:24'),
(109, 91, 17, 'Led Lighted Pocket Microscope ', 1, '3150', '2024-09-21 07:52:24'),
(110, 92, 24, 'Calculator', 1, '500', '2024-09-21 12:55:44'),
(111, 92, 17, 'Led Lighted Pocket Microscope ', 1, '3150', '2024-09-21 12:55:44'),
(112, 93, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '512.46', '2024-09-21 12:56:13'),
(113, 94, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '400', '2024-09-21 15:05:35'),
(114, 95, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-22 08:56:26'),
(115, 95, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '400', '2024-09-22 08:56:26'),
(116, 95, 4, 'Laboratory Microscope with 1500X Eyepieces', 1, '6030', '2024-09-22 08:56:26'),
(117, 96, 4, 'Laboratory Microscope with 1500X Eyepieces', 1, '6030', '2024-09-22 09:05:06'),
(118, 97, 44, 'OVERSEAS MART Survey Measuring Chain ', 2, '1110', '2024-09-22 09:19:40'),
(119, 98, 44, 'OVERSEAS MART Survey Measuring Chain ', 2, '1110', '2024-09-22 09:20:03'),
(120, 99, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 2, '1024.92', '2024-09-23 06:23:59'),
(121, 99, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-23 06:23:59'),
(122, 100, 49, 'test', 1, '10', '2024-09-23 06:28:31'),
(123, 100, 2, 'Welding Cap', 1, '490', '2024-09-23 06:28:31'),
(124, 101, 2, 'Welding Cap', 1, '490', '2024-09-23 06:31:34'),
(125, 102, 2, 'Welding Cap', 1, '490', '2024-09-23 06:45:12'),
(126, 102, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '238', '2024-09-23 06:45:12'),
(127, 103, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-23 06:52:32'),
(128, 103, 1, 'Welding Equipment Accessories ', 1, '722.5', '2024-09-23 06:52:32'),
(129, 104, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-23 06:57:12'),
(130, 105, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-23 07:09:36'),
(131, 106, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-23 07:12:53'),
(132, 107, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-23 07:14:10'),
(133, 108, 14, ' Silica Gel Pouches for Room Kitchen', 1, '159', '2024-09-23 07:30:21'),
(134, 109, 14, ' Silica Gel Pouches for Room Kitchen', 2, '318', '2024-09-23 07:39:29'),
(135, 110, 44, 'OVERSEAS MART Survey Measuring Chain ', 1, '555', '2024-09-23 08:13:57'),
(136, 111, 44, 'OVERSEAS MART Survey Measuring Chain ', 1, '555', '2024-09-23 10:11:59'),
(137, 112, 37, 'HILLSON Black 101 Industrial Safety Gumboots', 1, '860', '2024-09-23 10:35:02'),
(138, 113, 49, 'test', 4, '40', '2024-09-23 12:24:26'),
(139, 114, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-23 15:50:09'),
(140, 114, 23, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '420', '2024-09-23 15:50:09'),
(141, 115, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 2, '1200', '2024-09-23 15:57:28'),
(142, 115, 23, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '420', '2024-09-23 15:57:28'),
(143, 116, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-23 15:58:42'),
(144, 116, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '400', '2024-09-23 15:58:42'),
(145, 117, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-23 16:15:17'),
(146, 118, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '4999', '2024-09-24 08:37:52'),
(147, 119, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '4999', '2024-09-24 08:38:28'),
(148, 120, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '4999', '2024-09-24 08:41:37'),
(149, 121, 43, 'Etzin Portable USB Digital Microscope 40X-1000X Electron Microscope', 1, '1409.53', '2024-09-24 08:43:37'),
(150, 122, 21, 'AUTORICH COIL WINDING MACHINE COUNTER METER', 1, '1400', '2024-09-24 11:46:09'),
(151, 122, 10, 'HILLSON Black 101 Industrial Safety Gumboots ', 1, '582.23', '2024-09-24 11:46:09'),
(152, 123, 21, 'AUTORICH COIL WINDING MACHINE COUNTER METER', 1, '1400', '2024-09-25 06:08:08'),
(153, 123, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '512.46', '2024-09-25 06:08:08'),
(154, 124, 43, 'Etzin Portable USB Digital Microscope 40X-1000X Electron Microscope', 1, '1409.53', '2024-09-25 06:22:26'),
(155, 125, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-25 06:23:24'),
(156, 125, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-25 06:23:24'),
(157, 126, 21, 'AUTORICH COIL WINDING MACHINE COUNTER METER', 1, '1400', '2024-09-25 06:24:07'),
(158, 126, 48, 'chocolate', 1, '1', '2024-09-25 06:24:07'),
(159, 127, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-25 06:24:59'),
(160, 128, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-25 12:40:44'),
(161, 128, 48, 'chocolate', 1, '1', '2024-09-25 12:40:44'),
(162, 129, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-26 05:32:51'),
(163, 130, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-26 05:40:04'),
(164, 131, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-09-26 05:51:38'),
(165, 132, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '238', '2024-09-26 05:56:09'),
(166, 133, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-26 06:14:33'),
(167, 134, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-26 06:53:19'),
(168, 135, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 2, '1200', '2024-09-26 06:53:36'),
(169, 136, 48, 'chocolate', 1, '1', '2024-09-27 07:56:36'),
(170, 137, 48, 'chocolate', 1, '1', '2024-09-27 08:12:28'),
(171, 137, 27, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-27 08:12:28'),
(172, 138, 48, 'chocolate', 1, '1', '2024-09-27 09:33:09'),
(173, 139, 36, 'HILLSON Black 101 Industrial Safety Gumboots', 3, '2400', '2024-09-27 18:45:42'),
(174, 140, 36, 'HILLSON Black 101 Industrial Safety Gumboots', 2, '1600', '2024-09-27 18:51:32'),
(175, 141, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 2, '1198', '2024-09-27 18:57:07'),
(176, 142, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 3, '1797', '2024-09-27 19:01:30'),
(177, 143, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 2, '1198', '2024-09-28 05:13:16'),
(178, 144, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 2, '1198', '2024-09-28 05:18:58'),
(179, 145, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 2, '1198', '2024-09-28 05:28:39'),
(180, 146, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 3, '1797', '2024-09-28 05:34:19'),
(181, 147, 35, 'HILLSON Black 101 Industrial Safety Gumboots', 2, '2000', '2024-09-28 05:39:15'),
(182, 148, 10, 'HILLSON Black 101 Industrial Safety Gumboots ', 2, '1164.46', '2024-09-30 05:36:42'),
(183, 149, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-30 10:45:44'),
(184, 149, 28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-30 10:45:44'),
(185, 150, 10, 'HILLSON Black 101 Industrial Safety Gumboots ', 1, '582.23', '2024-09-30 10:46:41'),
(186, 151, 10, 'HILLSON Black 101 Industrial Safety Gumboots ', 1, '582.23', '2024-09-30 10:47:32'),
(187, 151, 48, 'chocolate', 1, '1', '2024-09-30 10:47:32'),
(188, 152, 48, 'chocolate', 1, '1', '2024-09-30 10:48:27'),
(189, 152, 42, 'HILLSON Black 101 Industrial Safety Gumboots', 1, '1200', '2024-09-30 10:48:27'),
(190, 153, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 2, '1200', '2024-09-30 10:50:07'),
(191, 154, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-30 15:49:31'),
(192, 154, 30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '400', '2024-09-30 15:49:31'),
(193, 155, 6, 'INDIAN DECOR 65302 Step Stool', 1, '1551.03', '2024-09-30 16:24:33'),
(194, 155, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-30 16:24:33'),
(195, 156, 6, 'INDIAN DECOR 65302 Step Stool', 1, '1551.03', '2024-09-30 18:24:11'),
(196, 156, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-09-30 18:24:11'),
(197, 156, 16, 'SR-1 Endeavor Search and Rescue Pac', 1, '670.65', '2024-09-30 18:24:11'),
(198, 157, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-10-01 06:59:13'),
(199, 157, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 2, '980', '2024-10-01 06:59:13'),
(200, 157, 10, 'HILLSON Black 101 Industrial Safety Gumboots ', 1, '582.23', '2024-10-01 06:59:13'),
(201, 158, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '238', '2024-10-01 08:02:44'),
(202, 158, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '4999', '2024-10-01 08:02:44'),
(203, 159, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-10-01 10:28:24'),
(204, 159, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-10-01 10:28:24'),
(205, 159, 48, 'chocolate', 2, '2', '2024-10-01 10:28:24'),
(206, 160, 48, 'chocolate', 3, '3', '2024-10-02 09:43:00'),
(207, 160, 42, 'HILLSON Black 101 Industrial Safety Gumboots', 1, '1200', '2024-10-02 09:43:00'),
(208, 161, 48, 'chocolate', 1, '1', '2024-10-02 10:00:44'),
(209, 162, 48, 'chocolate', 1, '1', '2024-10-02 10:01:18'),
(210, 162, 2, 'Welding Cap', 1, '490', '2024-10-02 10:01:18'),
(211, 163, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-10-02 10:17:41'),
(212, 164, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 1, '599', '2024-10-02 10:21:31'),
(213, 165, 53, 'CILICAnT Silica Gel White Sachets Desiccant Moisture ', 1, '599', '2024-10-02 10:25:29'),
(214, 165, 1, 'Welding Equipment Accessories ', 1, '722.5', '2024-10-02 10:25:29'),
(215, 165, 8, 'Reusable Heavy Duty Industrial Safety Gloves', 1, '243', '2024-10-02 10:25:29'),
(216, 165, 48, 'chocolate', 1, '1', '2024-10-02 10:25:29'),
(217, 166, 1, 'Welding Equipment Accessories ', 1, '722.5', '2024-10-02 15:18:09'),
(218, 167, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 15:23:20'),
(219, 168, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 15:27:09'),
(220, 169, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 15:31:35'),
(221, 170, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 15:35:32'),
(222, 171, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 15:36:42'),
(223, 172, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 17:37:03'),
(224, 173, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 17:40:18'),
(225, 174, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 18:03:50'),
(226, 175, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 18:05:12'),
(227, 176, 33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 1, '290', '2024-10-02 18:17:57'),
(228, 177, 22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', 1, '799', '2024-10-03 06:44:28'),
(229, 178, 22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', 1, '799', '2024-10-03 07:09:37'),
(230, 179, 22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', 1, '799', '2024-10-03 07:12:02'),
(231, 180, 22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', 1, '799', '2024-10-03 07:16:16'),
(232, 181, 22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', 1, '799', '2024-10-03 07:19:28'),
(233, 182, 3, 'B MARK Gardening Tools Hand Cultivator', 1, '380', '2024-10-03 07:32:37'),
(234, 182, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '99', '2024-10-03 07:32:37'),
(235, 183, 3, 'B MARK Gardening Tools Hand Cultivator', 1, '380', '2024-10-03 07:35:18'),
(236, 183, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '99', '2024-10-03 07:35:18'),
(237, 184, 3, 'B MARK Gardening Tools Hand Cultivator', 1, '380', '2024-10-03 07:36:51'),
(238, 184, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '99', '2024-10-03 07:36:51'),
(239, 185, 3, 'B MARK Gardening Tools Hand Cultivator', 1, '380', '2024-10-03 07:38:16'),
(240, 185, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '99', '2024-10-03 07:38:16'),
(241, 186, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '99', '2024-10-03 07:39:44'),
(242, 187, 34, 'Hawk Eye Polycarbonate Transparent Industrial, Scientific goggles', 1, '340', '2024-10-03 09:44:47'),
(243, 188, 48, 'chocolate', 1, '1', '2024-10-03 17:22:37'),
(244, 189, 34, 'Hawk Eye Polycarbonate Transparent Industrial, Scientific goggles', 1, '340', '2024-10-03 17:26:13'),
(245, 190, 34, 'Hawk Eye Polycarbonate Transparent Industrial, Scientific goggles', 1, '340', '2024-10-03 17:40:17'),
(246, 190, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '296', '2024-10-03 17:40:17'),
(247, 191, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 2, '592', '2024-10-03 17:44:08'),
(248, 192, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '119', '2024-10-04 10:41:24'),
(249, 192, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '296', '2024-10-04 10:41:24'),
(250, 192, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-04 10:41:24'),
(251, 193, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '296', '2024-10-04 15:25:48'),
(252, 194, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '296', '2024-10-04 17:11:29'),
(253, 195, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 2, '668.96', '2024-10-04 17:48:09'),
(254, 196, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-04 18:43:11'),
(255, 196, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-04 18:43:11'),
(256, 196, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 2, '196', '2024-10-04 18:43:11'),
(257, 197, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '280.84', '2024-10-05 06:05:18'),
(258, 197, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 06:05:18'),
(259, 197, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '6048.79', '2024-10-05 06:05:18'),
(260, 198, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 06:13:25'),
(261, 199, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 06:56:32'),
(262, 199, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '280.84', '2024-10-05 06:56:32'),
(263, 199, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '6048.79', '2024-10-05 06:56:32'),
(264, 200, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 07:28:28'),
(265, 200, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 2, '280.84', '2024-10-05 07:28:28'),
(266, 200, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-10-05 07:28:28'),
(267, 201, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 08:27:52'),
(268, 201, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 08:27:52'),
(269, 201, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-05 08:27:52'),
(270, 202, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 08:53:17'),
(271, 202, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 08:53:17'),
(272, 202, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-05 08:53:17'),
(273, 202, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '573.9552', '2024-10-05 08:53:17'),
(274, 203, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 09:02:44'),
(275, 203, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 09:02:44'),
(276, 203, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-05 09:02:44'),
(277, 204, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 2, '668.96', '2024-10-05 10:14:06'),
(278, 205, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-10-05 10:15:52'),
(279, 206, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 10:24:37'),
(280, 206, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 10:24:37'),
(281, 206, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-05 10:24:37'),
(282, 207, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '573.9552', '2024-10-05 12:24:57'),
(283, 208, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-10-05 13:31:28'),
(284, 209, 29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-10-05 13:54:33'),
(285, 209, 27, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-10-05 13:54:33'),
(286, 209, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-10-05 13:54:33'),
(287, 209, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 13:54:33'),
(288, 209, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-10-05 13:54:33'),
(289, 210, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-05 16:30:46'),
(290, 210, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-05 16:30:46'),
(291, 210, 54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 1, '98', '2024-10-05 16:30:46'),
(292, 210, 50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 1, '573.9552', '2024-10-05 16:30:46'),
(293, 211, 31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '600', '2024-10-13 07:36:54'),
(294, 211, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '140.42', '2024-10-13 07:36:54'),
(295, 211, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-10-13 07:36:54'),
(296, 212, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:25:04'),
(297, 213, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:32:15'),
(298, 214, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:33:34'),
(299, 215, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:37:45'),
(300, 216, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:48:13'),
(301, 217, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:48:47'),
(302, 218, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:51:13'),
(303, 219, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-13 10:51:59'),
(304, 220, 48, 'chocolate', 1, '1', '2024-10-15 16:18:10'),
(305, 221, 48, 'chocolate', 1, '1', '2024-10-15 16:26:24'),
(306, 222, 48, 'chocolate', 1, '1', '2024-10-15 16:26:55'),
(307, 223, 48, 'chocolate', 1, '1', '2024-10-18 10:01:39'),
(308, 224, 48, 'chocolate', 1, '1', '2024-10-18 10:07:55'),
(309, 225, 48, 'chocolate', 1, '1', '2024-10-18 12:23:35'),
(310, 226, 48, 'chocolate', 1, '1', '2024-10-18 13:00:59'),
(311, 227, 48, 'chocolate', 1, '1', '2024-10-19 12:53:38'),
(312, 228, 48, 'chocolate', 1, '1', '2024-10-21 11:33:30'),
(313, 229, 48, 'chocolate', 1, '1', '2024-10-22 12:02:29'),
(314, 230, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-24 12:32:34'),
(315, 231, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-10-24 12:33:45'),
(316, 232, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-11-03 12:55:04'),
(317, 233, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-11-03 12:57:55'),
(318, 234, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-11-03 13:01:05'),
(319, 235, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 1, '334.48', '2024-11-03 13:32:52'),
(320, 236, 55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 2, '668.96', '2024-11-04 10:58:47'),
(321, 237, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '1749.65', '2024-11-05 08:52:32'),
(322, 238, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '1749.65', '2024-11-06 10:03:10'),
(323, 239, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '95', '2024-11-06 10:54:11'),
(324, 240, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '2117.0765', '2024-11-06 11:29:39'),
(325, 241, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 2, '3499.3', '2024-11-07 16:54:17'),
(326, 242, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '1749.65', '2024-11-07 17:22:22'),
(327, 243, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '1749.65', '2024-11-12 03:01:24'),
(328, 244, 52, 'M-Pets Voyager Wire Crate with 2 Doors', 1, '1749.65', '2024-11-15 06:20:17'),
(329, 245, 57, ' Steelbird SBA-7 7Wings ISI Certified Flip-Up Helmet for Men and Women with Inner Smoke Sun Shield (X-Large 620 MM, Dashing Black)', 1, '1479.2', '2024-11-20 07:05:03'),
(330, 246, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '113.28', '2024-11-22 08:07:33'),
(331, 247, 51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 1, '113.28', '2024-11-22 08:08:27'),
(332, 248, 19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 1, '490', '2024-12-09 06:39:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Id` int(11) NOT NULL,
  `pname` varchar(500) NOT NULL,
  `SKU` varchar(500) NOT NULL,
  `category` varchar(500) NOT NULL,
  `brand` varchar(500) NOT NULL,
  `color` varchar(50) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `endDate` date NOT NULL,
  `description` text NOT NULL,
  `youtubeLink` varchar(500) NOT NULL,
  `igstn` int(11) NOT NULL,
  `img1` varchar(500) NOT NULL,
  `img2` varchar(500) NOT NULL,
  `img3` varchar(500) NOT NULL,
  `img4` varchar(500) NOT NULL,
  `img5` varchar(500) NOT NULL,
  `img6` varchar(500) NOT NULL,
  `img7` varchar(500) NOT NULL,
  `img8` varchar(500) NOT NULL,
  `weight` varchar(400) NOT NULL,
  `length` varchar(400) NOT NULL,
  `breadth` varchar(400) NOT NULL,
  `height` varchar(400) NOT NULL,
  `size` varchar(400) NOT NULL,
  `HSN` varchar(200) NOT NULL,
  `keyFeatures` text NOT NULL,
  `p_price` varchar(500) NOT NULL,
  `discount` int(11) NOT NULL,
  `pQuantity` int(11) NOT NULL,
  `Stock` varchar(255) NOT NULL DEFAULT 'In Stock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Id`, `pname`, `SKU`, `category`, `brand`, `color`, `date`, `endDate`, `description`, `youtubeLink`, `igstn`, `img1`, `img2`, `img3`, `img4`, `img5`, `img6`, `img7`, `img8`, `weight`, `length`, `breadth`, `height`, `size`, `HSN`, `keyFeatures`, `p_price`, `discount`, `pQuantity`, `Stock`) VALUES
(1, 'Welding Equipment Accessories ', 'welding-cap-1', 'Safety Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'BRAND - Waltzer India, SIZE - MS Rod 12 mm Length 165 mm Width 170 mm Thickness 25 mm, COLOR – Orange, QTY – 1Pcs\r\nPVC MATERIAL - Constructed from durable PVC material, ensuring longevity and resistance to corrosion, making it suitable for various environments including construction sites, swimming pools, and both overhead and underground water tanks.\r\nSLIP-RESISTANT SURFACE - PVC rungs are designed with a textured surface, providing enhanced grip and traction even in wet conditions, minimizing the risk of slips and falls.\r\nEASY INSTALLATION - Featuring a simple yet effective design, the PVC rungs with Nut Bolt can be easily installed onto surfaces such as concrete walls or metal frames using MS Rods (12mm), allowing for quick setup and hassle-free maintenance.\r\nVERSATILE APPLICATION - Suitable for a wide range of applications, including construction sites for accessing elevated areas, swimming pools for safe entry and exit, and maintenance tasks for overhead and underground water tanks.', '', 0, 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '850', 15, 0, 'Out of Stock'),
(2, 'Welding Cap', 'cap-orange-2', 'Safety Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'BRAND - Waltzer India, SIZE - MS Rod 12 mm Length 165 mm Width 170 mm Thickness 25 mm, COLOR – Orange, QTY – 1Pcs\r\nPVC MATERIAL - Constructed from durable PVC material, ensuring longevity and resistance to corrosion, making it suitable for various environments including construction sites, swimming pools, and both overhead and underground water tanks.\r\nSLIP-RESISTANT SURFACE - PVC rungs are designed with a textured surface, providing enhanced grip and traction even in wet conditions, minimizing the risk of slips and falls.\r\nEASY INSTALLATION - Featuring a simple yet effective design, the PVC rungs with Nut Bolt can be easily installed onto surfaces such as concrete walls or metal frames using MS Rods (12mm), allowing for quick setup and hassle-free maintenance.\r\nVERSATILE APPLICATION - Suitable for a wide range of applications, including construction sites for accessing elevated areas, swimming pools for safe entry and exit, and maintenance tasks for overhead and underground water tanks.', '', 0, 'weldingcap.jpg', 'weldingcap.jpg', 'weldingcap.jpg', 'weldingcap.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '500', 2, 0, 'Out of Stock'),
(3, 'B MARK Gardening Tools Hand Cultivator', '', 'Snake & Garden Tool', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Gardening Tools include Hand Cultivator, Small Trowel and Garden Fork Ergonomically designed handles for better grip and comfortable use Perfect tool set for all your gardening needs Mini Gardening Scissors and Garden Forks 4 Piece Gardening tool set. Leaf Rake - Garden Leaf Rake with Plastic Handle, Nine Teeth Grass Rake Garbage Clean up Fork Digger Excavator for Cultivating, Planting & Home Gardening Tool. Hand Rake - Garden 5 Tine Perennial Hand Rake with Plastic Handle Tool Fork Hoe Cultivator Super Convenient Grip Gardening Tools Perfect for loosening & Sculpting Soil, Removing Weeds, Aerated Soil. Trowel - Gardening Hand Trowel Shovel Bigger Planters Garden Tool for Digging, Planting, applying, Smoothing Rust Proof Strong Sturdy Bold Look PP Plastic Handle with Super Convenient Grip Tool. Prongs - 3-prongs Cultivator Garden Tool Fork Rust Proof Rake Spectacular Designer Specialty Garden Tools – Cultivator Loosens Soil Super Convenient Grip Tool. Cultivator - Gardening Tool Double Headed Hoe-Cultivator Digger Cutter Excavator for Home Gardens and Planting with Plastic Handle, Agriculture Digger & 3 prongs Tools. Apron - Garden Apron with Pockets - Heavy Duty Set - Waterproof Work Utility Apron - Great Gardener Gift Idea for Women and Men.', '', 0, 'cultivator.jpg', 'cultivator.jpg', 'cultivator.jpg', 'cultivator.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '400', 5, 0, 'Out of Stock'),
(4, 'Laboratory Microscope with 1500X Eyepieces', '', 'Civil Lab Equipments', 'Waltzer_India', '', '2024-07-18', '2024-10-30', 'DUAL LAYER MECHANICAL STAGE - The double layers mechanical stage with super precise control to position the specimen, coaxial coarse and fine focusing to make the observation clearer, you can easily adjust this binocular microscope for different needs.\r\n\r\n WIDE RANGE APPLICATIONS - Super clear imaging, magnifications from 1500X this professional compound binocular microscope is great for home school, teaching, demonstration, clinical examination, laboratories and advanced applications. \r\n\r\nFocus Capabilities-This binocular microscope has smooth, precise, and reliable fine focus capabilities - with coaxial fine and coarse control knobs . Adjustable Pupil \r\n\r\nSpacing-Overall optical system on this binocular microscope all work together to reduce eye strain and supply depth of field flexibility LED Illumination-LED illumination with variable-intensity control allow you to easily optimize color and contrast resolution This festive season, Gift your children a Microscope to discover, having 5 different specimen.\r\n This is a perfect gift Focusing by coarse and fine adjustment with scale Technical Specifications - Observation Head: Monocular observation head inclined at 45 degree, rotatable through 360 degree. Main body all parts die casted to provide long life & good mechanical strength. Focusing Precise and Separate coarse and fine focusing controls with ergonomically placed knobs on both directions.\r\n Magnification Configurations: 40X, 60X, 100X, 150X, 400X, 600X, 1000X, 1500X. \r\nEyepiece: Wide field 10x, 15x E.P. \r\nObjectives: 4x, 10x, 40/45x s. L. 100x oil immersion (s. L. ). \r\nNosepiece: Quadruple nosepiece revolves on ball bearing. Mechanical stage: Co-axial low positioned mechanical x-y stage of size 120 x 120 mm with stage fine vernier. Warranty: 1 year warranty against any manufacturing defect.', '', 0, 'microscope.jpg', 'microscope.jpg', 'microscope.jpg', 'microscope.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '6700', 10, 0, 'Out of Stock'),
(6, 'INDIAN DECOR 65302 Step Stool', '', 'Foot Step', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Multi-layer solid wood is applied to step stool, which is of high quality, sturdy and durable. Metal frame is welded with whole welding process to make step stool strong enough to support heavy duty. [Multi-function]:The step stool is used for kids to stand on to wash hands and brush teeth in bathroom, also a foot stool when sit on commode. In bedroom, you step on high bed with stool and then use it as stand for your laptop. When storytelling time for toddler, you reach for books on the top of shelf with step stool and have a good time with kid.', '', 0, 'shopping.jpg', 'shopping.jpg', 'shopping.jpg', 'shopping.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '1599', 3, 0, 'Out of Stock'),
(7, 'Daz Cam Safety Hard Head White Helmet ', '', 'Safety Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Enhance your safety during outdoor construction with our Safety Hard Head Helmet and Reflective Safety Jacket combo.\r\nReflective Safety Jacket with high visibility fluorescent vest and micro prismatic silver strips for 360 degrees visibility.\r\nDesigned for comfort, suits both men and women, vented top keeps head cool while working.\r\nReflective Safety Jacket made from premium fabric for exceptional quality and comfort.\r\nInvest in our Safety Hard Head Helmet and Reflective Safety Jacket combo today to enhance your security during outdoor activities.\r\nDurable polyethylene shell provides maximum protection against falling objects, impact, debris, rain, and electric shock.\r\nStay safe and protected during outdoor construction with our Safety Hard Head Helmet and Reflective Safety Jacket combo.', '', 0, '51aVDGZU8NL._SX425_.jpg', '51aVDGZU8NL._SX425_.jpg', '51aVDGZU8NL._SX425_.jpg', '51aVDGZU8NL._SX425_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '599', 50, 0, 'Out of Stock'),
(8, 'Reusable Heavy Duty Industrial Safety Gloves', '', 'Safety Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Heavy duty and reusable gloves designed for industrial use Made from high-quality nylon material for maximum durability Features anti-cut resistance to protect against sharp objects APPLICATION : These are used by Regular Household in kitchen , bathroom , cleaning . Engineers , construction workers , factory workers , Farmers , Carpenters , Plumbers , Fish meat Cutting , Painters , Salon , Chikan shops , Car mechanics Suitable for various applications including gardening, industrial work, and farming Designed for both men and women, providing a comfortable fit for all users Protect your hand from cuts and abrasions. ', '', 0, 'shopping4.jpg', 'shopping4.jpg', 'shopping4.jpg', 'shopping4.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '300', 19, 0, 'Out of Stock'),
(10, 'HILLSON Black 101 Industrial Safety Gumboots ', 'black-10-shoes', 'Safety Products', 'Waltzer India', 'Black', '2024-07-18', '2024-10-30', 'Model- Black 101 | Sole- Rubber | Closure- Slip -On | Shoe Width- Medium |Toe-Round | Size-8\r\nRubberized For Flexibility And Durability Light In Weight\r\nThe safety shoes are great for forging workshop, manufacture, construction and exploitation.\r\nAbsorb all kind of impacts reinforced to endure impacts, chemical spill, absorb electric shocks and resist high temperature, oil and acid resistant, anti-static, moisture wicking breathable fabric lining.', '', 0, '41lbPv-Qi2L.jpg', '41lbPv-Qi2L.jpg', '41lbPv-Qi2L.jpg', '41lbPv-Qi2L.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 5', '', '', '869', 33, 0, 'Out of Stock'),
(11, 'Amazon Basics Ds-Cjamz2010 12-In-1 Magnetic Ratchet Screwdriver (Blue) - 1 pc', '', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', '12-in-1 magnetic ratchet screwdriver for easily tightening and loosening screws; ideal for working on popular electric appliances, like air conditioners, washing machines, refrigerators, TVs, and more\r\nDriver’s 3 settings include fixed, forward, and reverse; driver’s free-spinning base allows for turning the handle while easily maintaining consistent pressure', '', 0, '51NVhgPc7KL._SX569_.jpg', '51NVhgPc7KL._SX569_.jpg', '51NVhgPc7KL._SX569_.jpg', '51NVhgPc7KL._SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '1000', 34, 0, 'Out of Stock'),
(12, 'GLAB INDIA SONOMETER', '', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'GLAB INDIA SONOMETER. Product Type: Arborist Merchandising Root > Self Service > Special Features Stores > ed30baf3-0a02-467a-b5d2-81dc4082e58e_0 > ed30baf3-0a02-467a-b5d2-81dc4082e58e_9501 > Great Indian Festival Health Care Devices', '', 0, 'shopping12.jpg', 'shopping12.jpg', 'shopping12.jpg', 'shopping12.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '3000', 1, 5, 'In Stock'),
(13, 'B4 Viscometer | Portable Brass Cup B-4 Liquid Flow', '', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', '-Uniform hardening,Temperature control\r\n,Low maintenance\r\n,3.97mm (0.16) Orifice diameter\r\n,71 – 455cSt Viscosity range', '', 0, '31j1fiuwEQL._SY445_.jpg', '31j1fiuwEQL._SY445_.jpg', '31j1fiuwEQL._SY445_.jpg', '31j1fiuwEQL._SY445_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '2499', 50, 0, 'Out of Stock'),
(14, ' Silica Gel Pouches for Room Kitchen', 'silica-14', 'Silica Gel and Desciccent', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Premium quality silica gel crystals\r\nEach packet contains silica gel crystals which helps to keep moisture away from different components\r\nThese pouches absorb moisture and provide de-moist dry conditions for all the components where they are placed.\r\nKeeping silica gel in closed places, removes any moisuter that will be formed and prevent the formation of all types rust, deterioration, oxidation, midew, fungus, mold, fogging etc.. It can be placed in a tool box to prevent tools from rusting, they can also be dropped inside a camera / lenses bag to safeguard them', '', 0, 'silica.jpg', 'silica.jpg', 'silica.jpg', 'silica.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '300', 47, 0, 'Out of Stock'),
(15, 'Rahul Professionals Safety Helmet with Hard Hat ', 'shoes-15', 'Safety Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'The Best quality plastic used ensures extra strength and sturdiness.\r\nSafety Helmet is designed to provide utmost protection to the head in high-risk environments like construction sites, industries, workshops, roadsides, etc. from falling objects, impact with other objects, debris, rain, and electric shock.\r\nThe head band is made of non-irritant and soft fabric to provide maximum comfort to the user.', '', 0, '51jn8WwoplL._SX569_.jpg', '51jn8WwoplL._SX569_.jpg', '51jn8WwoplL._SX569_.jpg', '51jn8WwoplL._SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '800', 50, 0, 'Out of Stock'),
(16, 'SR-1 Endeavor Search and Rescue Pac', '', 'Search & Rescue', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'MODULAR: Modular Pack System for Multiple Set-Up Options, Holds MOLLE or Alice Clip Accessories, Daisy Chain with Built In Ladderloc Provides the Ability to Attach Belt-Loop Accessories\r\nDURABLE: DuPont 1000 Denier Cordura, ITW Nexus buckles and hardware, YKK zipper pulls and tape, and reinforced stress points and backed by our 100% Guarantee\r\nADJUSTABLE: Aluminum Stay Frame Structuring for Custom Fit, Patent Pending D.A.S. Dual Action Stabilizer, Ergonomically Designed Harness System', '', 0, '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '789', 15, 0, 'Out of Stock'),
(17, 'Led Lighted Pocket Microscope ', '', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', '20-40x pocket microscope with bright LED lighting to illuminate viewing subjects and ensure a clear and bright image\r\nMeasures 2.8 x 10 x 5.3 cm (W x H x D) with a weight of 56 g\r\nPowered by three LR44 button batteries (included); Comes with two slides and a base stand\r\nZoom Pocket Microscope with Integrated LED', '', 0, 'civil.jpg', 'civil.jpg', 'civil.jpg', 'civil.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '3500', 10, 0, 'Out of Stock'),
(18, 'Search & Resuce Bag', '', 'Search & Rescue', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'it is very nice bag', '', 0, '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '919spD+ww7L._AC_SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '500', 4, 5, 'In Stock'),
(19, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-BLUE-19', 'Safety Products', 'Waltzer India', 'Blue', '2024-07-18', '2024-10-30', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, '51ZsJ9GGbGL._SX569_.jpg', '51ZsJ9GGbGL._SX569_.jpg', '51ZsJ9GGbGL._SX569_.jpg', '51ZsJ9GGbGL._SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'Universal', '', '', '500', 2, 81, 'In Stock'),
(20, 'G Lab Compound Student Microscope with LED ', '', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', '2 AA batteries required. (included)\r\nIs Discontinued By Manufacturer ‏ : ‎ No\r\nProduct Dimensions ‏ : ‎ 25 x 7 x 7 cm; 2.5 kg\r\nDate First Available ‏ : ‎ 23 August 2018\r\nManufacturer ‏ : ‎ G Lab\r\nASIN ‏ : ‎ B07GSZ3MLS\r\nItem part number ‏ : ‎ LB_14\r\nCountry of Origin ‏ : ‎ India\r\nManufacturer ‏ : ‎ G Lab\r\nItem Weight ‏ : ‎ 2 kg 500 g\r\nItem Dimensions LxWxH ‏ : ‎ 25 x 7 x 7 Centimeters\r\nNet Quantity ‏ : ‎ 1.00 count', '', 0, '41WA1jddPjL._SY300_SX300_QL70_FMwebp_.jpg', '41WA1jddPjL._SY300_SX300_QL70_FMwebp_.jpg', '41WA1jddPjL._SY300_SX300_QL70_FMwebp_.jpg', '41WA1jddPjL._SY300_SX300_QL70_FMwebp_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '500', 0, 0, 'Out of Stock'),
(21, 'AUTORICH COIL WINDING MACHINE COUNTER METER', '', 'Industry Scientific', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'AUTORICH Winding machine counter meter SR5 RL/CB 1:1.\r\nCOUNTER MATERIAL: METAL BODY, THIS IS METAL BODY COUNTER, LONG LIFE AND HEAVY DUTY COUNTER.\r\nGOOD QUALITY\r\nGOOD STABILITY AND WORKING', '', 0, '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '1400', 0, 0, 'Out of Stock'),
(22, 'SAI PRASEEDA UV Stablized 3.3 Feet Height', '', 'Fencing Products', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'SAI PRASEEDA Maintaining Quality Products(MADE IN INDIA)\r\n100% UV Sun Light Protection\r\nIn the Pack Contains:Tree Guard,Cutter,PVC Tags\r\nMaterial:Virgin HDPE Heavy Guage & Foldable\r\nNOTE:If you Didn’t get Safety Cover Packing,Free Accessories 1 Cutter,PVC Tags Kindly Return', '', 0, '81MTCQmgayL._SX679_.jpg', '81MTCQmgayL._SX679_.jpg', '81MTCQmgayL._SX679_.jpg', '81MTCQmgayL._SX679_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '799', 0, 0, 'Out of Stock'),
(23, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', '', 'Silica Gel and Desciccent', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'COLOR-CHANGING - One of the most distinctive features of blue silica gel is that it changes color as it absorbs moisture. When the silica gel is dry, it is blue in color, but as it absorbs moisture, it gradually turns pink.\r\n\r\nREUSABLE - Unlike some other types of desiccants, blue silica gel can be reused multiple times. Once it has absorbed moisture, it can be regenerated by heating it in an oven or microwave.\r\nNON-TOXIC - Blue silica gel is non-toxic and safe to use in food and pharmaceutical applications. It does not emit any harmful vapors or odors.\r\nHIGH ABSORPTION CAPACITY - Blue silica gel has a high absorption capacity and can absorb up to 40% of its weight in moisture.\r\nVERSATILE - Blue silica gel can be used in a wide range of applications, including electronics, food packaging, and pharmaceuticals. It is also effective at preventing rust and corrosion.    \r\n\r\nSilica gel blue is an option for controlling moisture which contains cobalt chloride in it. When silica gel absorbs moisture, its beads color change from blue to purple to pink, this indicates that the gel needs to be replaced or regenerated. The reason behind is cobalt chloride. Blue silica gel is also available in crystals forms which absorb approximately 30-40 percent of its weight in water.it is DMF free, non corrosive,odorless and tasteless.', '', 0, '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '81YdtBjI3BL._SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', '1 kg', '', 'ADAPTIBILITY : It is a nice product used in many industry.\r\n\r\nCOMFORTABLE PRICE : It is available in affordable price.', '1000', 58, 0, 'Out of Stock'),
(24, 'Calculator', '', 'Industry Scientific', 'Waltzer_India', '', '2024-07-18', '2024-10-30', 'It is a nice product.', '', 0, '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '411LYYjTtBL._SX522_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '500', 0, 0, 'Out of Stock'),
(25, 'Shruti \'s Product', '', 'Shruti Ki Category', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Women empowerment all refer to the empowerment of women to take all decisions from their choice. So that she can take all of the decisions for her social and economic development. Empowerment of women will surely encourage all of the women to stand for their education and the life of their own choice.', '', 0, 'Clean India Campaign.jpg', 'Clean India Campaign.jpg', 'Clean India Campaign.jpg', 'Clean India Campaign.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '5000', 0, 5, 'In Stock'),
(26, 'product1', 'product-26', 'Civil Lab Equipments', 'Waltzer India', '', '2024-07-18', '2024-10-30', 'Cement testing equipment has varieties of Civil engineering lab equipments comprises of Cement samplers, Le Chatelier flask, Le Chatelier moulds, Length comparator, Hydraulic shrinkage mould, High pressure Autoclave, Two gang prism mould, Blaine fineness apparatus, Standard Vicat apparatus, Vibrating machine, Marsh ', '', 0, 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '500', 0, 0, 'Out of Stock'),
(27, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-ORANGE-27', 'Safety Products', 'Waltzer_India', 'Orange', '2024-07-18', '2024-10-30', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, 'weldingcap.jpg', '51ZsJ9GGbGL._SX569_.jpg', '51jn8WwoplL._SX569_.jpg', 'weldingcap.jpg', '', '', '', '', '6.5', '25', '14', '12', 'L', '', '', '600', 0, 81, 'In Stock'),
(28, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-RED-28', 'Safety Products', 'Waltzer India', 'Red', '0000-00-00', '0000-00-00', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, '31Wmql88hNL._SX300_SY300_QL70_FMwebp_.jpg', '31Wmql88hNL._SX300_SY300_QL70_FMwebp_.jpg', '31Wmql88hNL._SX300_SY300_QL70_FMwebp_.jpg', '31Wmql88hNL._SX300_SY300_QL70_FMwebp_.jpg', '', '', '', '', '0.5', '12', '14', '12', 'Standard', '', '', '600', 0, 81, 'In Stock'),
(29, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-GREEN-29', 'Safety Products', 'Waltzer India', 'Green', '0000-00-00', '0000-00-00', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, '61M6qK3Z8EL._SX569_.jpg', '61M6qK3Z8EL._SX569_.jpg', '61M6qK3Z8EL._SX569_.jpg', '61M6qK3Z8EL._SX569_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'Universal', '', '', '600', 0, 81, 'In Stock'),
(30, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-WHITE-30', 'Safety Products', 'Waltzer India', 'White', '0000-00-00', '0000-00-00', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, '31ChqZLZHdL._SS36_.jpg', '31ChqZLZHdL._SS36_.jpg', '31ChqZLZHdL._SS36_.jpg', '31ChqZLZHdL._SS36_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'Standard', '', '', '400', 0, 0, 'Out of Stock'),
(31, 'KARAM ISI Marked Safety Helmet for Construction & Outdoor Activities', 'KARAM -SAFETY-YELLOW-31', 'Safety Products', 'Waltzer India', 'Yellow', '0000-00-00', '0000-00-00', 'Package Include: Karam ISI marked safety helmet with Ratchet type adjustment for outdoor head protection (1 Piece, Lamination blue)\r\nCertified to: IS 2925:1984, Material: Polypropylene co-polymer which comes with increased vertical clearance for optimum shock absorption.', '', 0, '31qpWXXlVVL._SX300_SY300_QL70_FMwebp_.jpg', '31qpWXXlVVL._SX300_SY300_QL70_FMwebp_.jpg', '31qpWXXlVVL._SX300_SY300_QL70_FMwebp_.jpg', '31qpWXXlVVL._SX300_SY300_QL70_FMwebp_.jpg', '', '', '', '', '0.5', '12', '12', '12', 'Universal', '', '', '600', 0, 81, 'In Stock'),
(32, 'Vernier Transit Theodolite Survey Instruments', 'VERNIE-CIVIL -32', 'Civil Lab Equipments', 'Waltzer India', 'Grey', '0000-00-00', '0000-00-00', 'The Vernier Transit Theodolite is an essential surveying instrument commonly used in civil construction works. It is designed to accurately measure horizontal and vertical angles, making it a versatile tool for a wide range of construction and engineering tasks. Here is a detailed description of the Vernier Transit Theodolite: Instrument Type: Vernier Transit Theodolite Color: Sliver & Grey - The theodolite typically features a durable silver and grey finish that not only adds to its aesthetic appeal but also provides protection against corrosion and wear, ensuring longevity. Accuracy: Standard - This Vernier Transit Theodolite is built to meet industry-standard accuracy requirements, making it suitable for precise surveying and construction applications. Angle Measurement: The instrument is capable of measuring both horizontal and vertical angles with high accuracy, allowing for the precise determination of angles and directions on construction sites. Accessories: This package includes complete accessories, ensuring that you have everything you need to perform accurate surveys. Common accessories may include lens covers, cleaning tools, sunshades, adjusting tools, and a carrying case for safe storage and transportation. Tripod: The theodolite comes with a compatible tripod, providing stability and support for the instrument during measurements. The tripod is an essential component for ensuring accurate readings. Angular Resolution: It features a high angular resolution of 10 seconds, which means it can measure angles with a precision of 10 arc seconds. This level of accuracy is crucial for tasks that demand precision, such as construction layout and boundary surveys. Applications: Vernier Transit Theodolites are widely used in civil construction works, including land surveying, road construction, building construction, tunneling, and more. They are invaluable for tasks such as setting out points, aligning structures, and measuring angles for elevation.', '', 0, '31MLJEtIczL.jpg', '31MLJEtIczL.jpg', '31MLJEtIczL.jpg', '31MLJEtIczL.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '29888', 7, 5, 'In Stock'),
(33, 'FREEMANS Leatherette 15m:13mm Fibreglass Measuring Tape', 'FREEMA-CIVIL -33', 'Civil Lab Equipments', 'Waltzer India', '', '0000-00-00', '0000-00-00', 'FMI Limited is the pioneer and the largest manufacturer of measuring tapes, spirit levels and measuring wheels in the Indian sub-continent. Our products have been marketed under the FREEMANS brand since 1950 and conform to the best international quality standards. We are well established in over 60 countries worldwide and are amongst the first Non-European companies to attain CE (MID) certification for our measuring tools.', '', 0, '81y6wRUiBEL._SX679_.jpg', '81y6wRUiBEL._SX679_.jpg', '81y6wRUiBEL._SX679_.jpg', '81y6wRUiBEL._SX679_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '290', 0, 0, 'Out of Stock'),
(34, 'Hawk Eye Polycarbonate Transparent Industrial, Scientific goggles', 'HAWK E-INDUST-34', 'Industry Scientific', 'Waltzer India', '', '0000-00-00', '0000-00-00', 'Owing to the panoramic design, the entire field of vision is always in view while your eyes are protected from all sides along with a pleasant wearing feel & perfect fit.\r\nMade from clear polycarbonate polymer, it resists shattering apart from enhanced protection against splash, fog, chemicals and temperature variation I various application areas.', '', 0, '61kBxWccaeL._SX679_.jpg', '61kBxWccaeL._SX679_.jpg', '61kBxWccaeL._SX679_.jpg', '61kBxWccaeL._SX679_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '340', 0, 0, 'Out of Stock'),
(35, 'HILLSON Black 101 Industrial Safety Gumboots', 'shoe-yellow-34', 'Safety Products', 'Waltzer India', 'Yellow', '0000-00-00', '0000-00-00', 'What’s in the Box: Robustt Yellow Gum Boots\r\nTear and Puncture Resistance: The Safety Shoes are fabricated using specially developed materials engineered to withstand tears and punctures, the gumboot exhibits exceptional durability. Their inherent resistance to tearing and puncturing renders them particularly well-suited for environments in presence of sharp elements, including nails, thorns & debris.\r\nPerfect Fit: Robustt gum boots are committed to ensuring wearer comfort by employing an ergonomic design and incorporating carefully selected lining materials. The Safety Shoes features cushioned insoles and padding, these safety shoes provide ample support and shock absorption to alleviate strain.', '', 0, '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '', '', '', '', '0.84', '25', '14', '12', 'UK 6', '', '', '1000', 0, 0, 'Out of Stock'),
(36, 'HILLSON Black 101 Industrial Safety Gumboots', 'shoe-red-35', 'Safety Products', 'Waltzer India', 'Red', '0000-00-00', '0000-00-00', 'What’s in the Box: Robustt Red Gum Boots\r\nTear and Puncture Resistance: The Safety Shoes are fabricated using specially developed materials engineered to withstand tears and punctures, the gumboot exhibits exceptional durability. Their inherent resistance to tearing and puncturing renders them particularly well-suited for environments in presence of sharp elements, including nails, thorns & debris.\r\nPerfect Fit: Robustt gum boots are committed to ensuring wearer comfort by employing an ergonomic design and incorporating carefully selected lining materials. The Safety Shoes features cushioned insoles and padding, these safety shoes provide ample support and shock absorption to alleviate strain.', '', 0, '31l72gmzWQL._SY445_SX342_QL70_FMwebp_.jpg', '31l72gmzWQL._SY445_SX342_QL70_FMwebp_.jpg', '31l72gmzWQL._SY445_SX342_QL70_FMwebp_.jpg', '31l72gmzWQL._SY445_SX342_QL70_FMwebp_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 6', '', '', '800', 0, 0, 'Out of Stock'),
(37, 'HILLSON Black 101 Industrial Safety Gumboots', 'show-yellow-37', 'Safety Products', 'Waltzer India', '', '0000-00-00', '0000-00-00', 'Model- Black 101 | Sole- Rubber | Closure- Slip -On | Shoe Width- Medium |Toe-Round | Size-8\r\nRubberized For Flexibility And Durability Light In Weight.\r\nThe safety shoes are great for forging workshop, manufacture, construction and exploitation.\r\nAbsorb all kind of impacts reinforced to endure impacts, chemical spill, absorb electric shocks and resist high temperature, oil and acid resistant, anti-static, moisture wicking breathable fabric lining.', '', 0, '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '51srkR-SyYL._SX466_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 7', '', '', '860', 0, 0, 'Out of Stock'),
(39, 'Liberty Warrior 98-02-SSBA High Ankle Safety Shoes ', 'black-40', 'Sneakers', 'Waltzer India', 'Black', '0000-00-00', '0000-00-00', 'Upper : Genuine Barton Leather\r\nLINING : Rice knit mesh lining, Breathable, Odour free, Antibacterial soft\r\nINSOCKS : LIBACTIVE Antibacterial & breathable insocks with arch support\r\nSTEEL TOE : Steel toe cap as per European standards provide plenty of toe room and ensures there is no discomfort or fatigue even after long hours of use Tested for energy level upto 200 Joules EN 12568: 2010\r\nNOTE : Kindly follow the size chart for the best fit', '', 0, '913OTdiWERL._SY625_.jpg', '913OTdiWERL._SY625_.jpg', '913OTdiWERL._SY625_.jpg', '913OTdiWERL._SY625_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 7', '', '', '1000', 0, 5, 'In Stock'),
(40, 'Liberty Warrior 98-02-SSBA High Ankle Safety Shoes ', 'red-399', 'Sneakers', 'Waltzer India', 'Red', '0000-00-00', '0000-00-00', 'Features: Crafted with high quality suede leather with single density black PU sole which are built to be durable and long-lasting. It has steel toe cap with anti slip, anti static features with oil and acid resistance.\r\nAdvanced Protection: Designed to resist the corrosive effects of oils and acids, providing reliable protection in hazardous work environments.\r\nUnmatched Comfort: Equipped with textile loop and flat laces for knotting grip, foam padding in below tongue to enhance fit & comfort with cushioned top line for extra comfort.\r\nIdeal Use - Perfect for all kind of automotive, chemical , electrical & mining industries.\r\nCerification Norms: Compliant with EN 20345:2011 and IS 15298:2016 certification standards.', '', 0, '51JZYnAAvLL._AC_UL320_.jpg', '51JZYnAAvLL._AC_UL320_.jpg', '51JZYnAAvLL._AC_UL320_.jpg', '51JZYnAAvLL._AC_UL320_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 6', '', '', '500', 0, 0, 'Out of Stock'),
(41, 'AjantaExports Aggregate Impact Value lab equipment', 'civil-blue-30', 'Civil Lab Equipments', 'Waltzer India', '', '0000-00-00', '0000-00-00', 'Aggregate Impact Value (AIV) is a test used to determine the resistance of aggregates to sudden impacts or shocks.\r\nThe test measures the percentage of fines generated when an aggregate specimen is subjected to impact in a standardized testing apparatus.\r\nAIV is an important parameter in assessing the suitability of aggregates for various construction applications.\r\nThe test involves subjecting the aggregate sample to a standard amount of impact using a falling hammer.\r\nThe resulting fines are collected and weighed to calculate the AIV, which is expressed as a percentage.', '', 0, '51ZSf3un+KL._AC_UL320_.jpg', '51ZSf3un+KL._AC_UL320_.jpg', '51ZSf3un+KL._AC_UL320_.jpg', '51ZSf3un+KL._AC_UL320_.jpg', '', '', '', '', '6.5', '25', '14', '12', '', '', '', '20000', 0, 2, 'In Stock'),
(42, 'HILLSON Black 101 Industrial Safety Gumboots', 'black-blue-500', 'Safety Products', 'Waltzer India', 'Blue', '0000-00-00', '0000-00-00', 'Product details\r\nShaft heightMid-calf\r\nHeel typeFlat\r\nClosure typePull-On\r\nToe styleRound Toe\r\nSole materialPolyvinyl Chloride\r\nOuter materialPolyvinyl Chloride (PVC)\r\nCountry of OriginIndia\r\n', '', 0, '611x1QT8RhL._SY695_.jpg', '611x1QT8RhL._SY695_.jpg', '611x1QT8RhL._SY695_.jpg', '611x1QT8RhL._SY695_.jpg', '', '', '', '', '6.5', '25', '14', '12', 'UK 10', '', '', '1200', 0, 0, 'Out of Stock'),
(43, 'Etzin Portable USB Digital Microscope 40X-1000X Electron Microscope', 'ETZIN -INDUST-BLACK-43', 'Industry Scientific', 'Waltzer India', 'Black', '0000-00-00', '0000-00-00', 'The portable USB digital microscope with 2.0 Mega pixels and 1000X magnification can capture every detail. It has 8 adjustable LED lights ensuring that your subject is very well illuminated..\r\nSimply plug into your USB port, install driver software from the provided software CD, then you can use it. It is widely applied in a range of professional fields..\r\nHigh performance, portable design, convenient to carry, and easy to operate..', '', 0, '41xV627Y4QL._SX300_SY300_QL70_FMwebp_.jpg', '41xV627Y4QL._SX300_SY300_QL70_FMwebp_.jpg', '41xV627Y4QL._SX300_SY300_QL70_FMwebp_.jpg', '41xV627Y4QL._SX300_SY300_QL70_FMwebp_.jpg', '', '', '', '', '5.2', '11', '4', '4', '', '', '', '2999', 53, 0, 'Out of Stock'),
(44, 'OVERSEAS MART Survey Measuring Chain ', 'Black-45', 'Industry Scientific', 'Waltzer India', '', '2024-08-15', '0000-00-00', '\r\nBrand	OVERSEAS MART\r\nItem Weight	5.5 Kilograms\r\nBlade Length	1 Metres\r\nBlade Material	Metal\r\nManufacturer	OVERSEAS mart', '', 0, '415bMAv6VlL._SY445_SX342_QL70_FMwebp_.jpg', '415bMAv6VlL._SY445_SX342_QL70_FMwebp_.jpg', '415bMAv6VlL._SY445_SX342_QL70_FMwebp_.jpg', '415bMAv6VlL._SY445_SX342_QL70_FMwebp_.jpg', '', '', '', '', '10', '12', '25', '30', '', '', '', '555', 0, 0, 'Out of Stock'),
(45, 'QADAR Executive Safety Jacket, Multi-Purpose Safety Jacket With 4 Pockets.', 'Safety-products-445', 'Safety Products', 'Waltzer India', 'Green', '2024-08-15', '0000-00-00', 'Wash Instruction: Dry clean only\r\nMulti-purpose safety jacket. 360-degree visibility and 4 pockets\r\nThe Executive safety jacket is made out of high-quality nylon, which makes it lightweight and easy to carry.\r\nWith reflective stripes at the front and back, this jacket is a must-have for outdoor.', '', 0, '51OxGhg59XL._SX569_.jpg', 'chain-jacket-250x250.jpg', 'chain-jacket-250x250.jpg', 'chain-jacket-250x250.jpg', '', '', '', '', '60', '30', '40', '120', '', '', '', '800', 60, 0, 'Out of Stock'),
(47, 'test1', 'skiu-1', 'Safety Products', 'Waltzer India', 'Green', '2024-09-02', '0000-00-00', 'JACKET ; - It is a nice jacket.\r\n\r\nPRICE : - 212.', '', 0, 'chain-jacket-250x250.jpg', 'chain-jacket-250x250.jpg', 'chain-jacket-250x250.jpg', 'chain-jacket-250x250.jpg', '', '', '', '', '0.5', '15', '15', '15', '', '', '', '200', 23, 0, 'Out of Stock'),
(48, 'chocolate', 'choco-29', 'Safety Products', 'Waltzer India', '', '2024-09-03', '0000-00-00', 'ECLAIRS : It is a very nice chocolate and its flavor is also nice. Everyone with every age love this..\r\n\r\nFLAVORS : It has different flavors and all flavors are amazing..', '', 0, 'eclier.jpg', '4226091-uhd_3840_2160_25fps.mp4', 'c.jpg', 'chocolates.jpg', '', '', '', '', '0.5', '1', '1', '1', '', '', '', '1', 0, 71, 'In Stock'),
(49, 'test', 'test-202', 'Safety Products', 'Waltzer India', '', '2024-09-03', '0000-00-00', 'It is a Kacccha Aam chocolate.', '', 7, 'download.jfif', 'download.jfif', '8965561-uhd_2160_3840_25fps.mp4', 'download.jfif', '', '', '', '', '0.5', '10', '10', '10', '', '', '', '10', 0, 0, 'Out of Stock'),
(50, 'SAVIOUR PERFORMING PPE Saviour Industrial Safety Freedom Helmet with Ratchet HDPE White', 'helmet-500', 'Safety Products', 'Waltzer India', '', '2024-09-19', '0000-00-00', 'Complete Head Protection with Provision for Heat dissipation during extended working in the Field due to 15 ventilation Holes.\r\nHigher Impact resistance ensures higher Safety\r\nAero-Dynamic designs ensures ease of wear and more Ergonomic comfort.\r\nSoft Sweatband ensures adjustment to head contours for ease of wear and absorption of sweat ensuring comfort to the wearer\r\nAdjustable Chin strap ensures proper fitment ensuring higher Safety', '', 12, '51aKqJN7jiL._AC_UL320_.jpg', '31Wmql88hNL._SX300_SY300_QL70_FMwebp_.jpg', '51ZsJ9GGbGL._SX569_.jpg', '51ZsJ9GGbGL._SX569_.jpg', '', '', '', '', '0.03', '12', '13', '14', '', '', '', '702', 27, 0, 'Out of Stock'),
(51, 'TrustBasket Reusable,Heavy Duty Garden Hand Gloves', 'testing-test-200', 'Snake Catcher Stickes And Tools', 'Waltzer India', '', '2024-09-22', '0000-00-00', '\r\nMaterial	Polyester\r\nBrand	TrustBasket\r\nSize	2 Count (Pack of 1)\r\nColour	Yellow\r\nSpecial Feature	Breathable\r\nAbout this item\r\nPackage Contents: 2-Pieces Gardening Gloves\r\nErgonomically designed for greater comfort\r\nPolyester cotton seamless liner\r\nLavish breathable open back, Crinkle finish for excellent grip\".', 'https://www.youtube.com/embed/YRdLWiek9bg?si=shoIEZqZuYepXkbT', 18, '71dJiDl1rAL._SX522_.jpg', 'Search & Rescue.jpg', '71dJiDl1rAL._SX522_.jpg', '71dJiDl1rAL._SX522_.jpg', '', '', '', '', '0.5', '6', '6', '6', '', '', '', '100', 4, 91, 'In Stock'),
(52, 'M-Pets Voyager Wire Crate with 2 Doors', 'cages-230', 'Fencing Product', 'Waltzer India', '', '2024-09-24', '0000-00-00', 'AILSNATION3: Get ₹329/- OFF on min. purchase of ₹4999/-\r\n\r\nCATLITTER5: Get 5% OFF on Litter Bags View Products\r\n\r\nWELCOME5: Get 5% OFF on your first order\r\n\r\nSUPERSAVING12: Get 12% OFF on min. purchase of ₹16999/-\r\n\r\nSUPERSAVING8: Get 8% OFF on min. purchase of ₹11999/-', 'https://www.youtube.com/embed/yDRZXP6yOSc?si=qxxu3m2cCULQb9G1', 21, '2623-550x550w.jpg', '2623-550x550w.jpg', '2623-550x550w.jpg', '2623-550x550w.jpg', '', '', '', '', '2', '12', '12', '12', '', '', '', '4999', 65, 78, 'In Stock'),
(53, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 'silica-white-21', 'Silica Gel and Desciccent', 'Waltzer India', '', '2024-09-26', '0000-00-00', 'CILICANT DESICCANT DEHUMIDIFIER provides tear-proof, dust-free packets for maximum protection from humidity.It provides superior absorption and remains dry at maximum saturation.\r\nWHY TO USE - Cilicant Silica gel desiccant is a highly active adsorption material, has good thermal properties and chemical stability, and does not react with other substances. CILICANT Silica gel desiccant adsorbs moisture from the air in enclosed spaces.\r\nWHERE TO USE - Cilicant Silica Gel moisture absorber is ideal for closed spaces of shoe cabinets, camera lenses, bags, wardrobes or wherever stagnant air is a problem, Leather, textile, footwear, handicrafts industry, Electronics, Jewellery etc.', 'https://www.youtube.com/embed/sfI_ps8GJQQ?si=kjxyGhzfgLPcIVe5', 18, '81h3hb8ilXL._AC_UY218_.jpg', '41hNYhtcmWL._SS100_.jpg', '41jUOfnFqYL._SS100_.jpg', '41ZsnBbpfmL._SS100_.jpg', '', '', '', '', '0.4', '2', '2', '3', '', '', '', '599', 3, 0, 'Out of Stock'),
(54, 'TDO Silica Gel 250 Gm Pouch 4 Pcs', 'testing-silica-11', 'Silica Gel and Desciccent', 'Waltzer India', 'White', '2024-09-26', '0000-00-00', 'COLOR-CHANGING - One of the most distinctive features of blue silica gel is that it changes color as it absorbs moisture. When the silica gel is dry, it is blue in color, but as it absorbs moisture, it gradually turns pink. \r\n\r\nREUSABLE - Unlike some other types of desiccants, blue silica gel can be reused multiple times. Once it has absorbed moisture, it can be regenerated by heating it in an oven or microwave. \r\n\r\nNON-TOXIC - Blue silica gel is non-toxic and safe to use in food and pharmaceutical applications. It does not emit any harmful vapors or odors. \r\n\r\nHIGH ABSORPTION CAPACITY - Blue silica gel has a high absorption capacity and can absorb up to 40% of its weight in moisture. \r\n\r\nVERSATILE - Blue silica gel can be used in a wide range of applications, including electronics, food packaging, and pharmaceuticals. It is also effective at preventing rust and corrosion. Silica gel blue is an option for controlling moisture which contains cobalt chloride in it. When silica gel absorbs moisture, its beads color change from blue to purple to pink, this indicates that the gel needs to be replaced or regenerated. The reason behind is cobalt chloride. Blue silica gel is also available in crystals forms which absorb approximately 30-40 percent of its weight in water.it is DMF free, non corrosive,odorless and tasteless.', '', 0, '81h3hb8ilXL,_AC_UY218__enhanced.jpg', '71h5r186WGL._SL1280_.jpg', '41ZsnBbpfmL._SS100_.jpg', '41hNYhtcmWL._SS100_.jpg', '', '', '', '', '0.5', '1', '1', '1', '0.5 kg', '103', 'QUANTITY : 4 (EACH 250 GRAM Packets )\r\n\r\n\r\nMoisture absorbers for Madisin Tablet and food storage.\r\n\r\n\r\nOld photos won’t stick by the help of Silica Gel Desiccant\r\nThese pouches absorb moisture and provide de-moist conditions for all the components where they are placed.\r\n\r\n\r\nIt can also be used to protect leather jackets, shoes / boots, photograph albums, computer media storage, electronics Car,Camera, Lenses.', '100', 2, 0, 'Out of Stock'),
(55, 'Elysian Self Indicating Blue Crystal Indicating Silica Gel Bulk Desiccant Crystal', 'silica-blue-58', 'Silica Gel and Desciccent', 'Waltzer India', 'Blue', '2024-10-03', '0000-00-00', 'QUANTITY - 1000 Gram Crystal Size (6-12mm) | Color- Blue\r\n\r\nIndicating Silica Gel Crystal - Elysian blue indicating Silica gel (6-12mm in size) are designed to change color within a humidity range of 20%-50%. Once saturated with moisture, the Crystal will complete the color change to pink. It\'s important to note that the initial color change does not indicate full saturation. Silica gel will continue to absorb moisture until reaching 50%RH. We recommend periodically checking the silica gel to ensure their effectiveness.\r\n\r\nEasy to Reactivate - Indicating Silica gel are 6-12mm in size and have a vibrant blue color. Simply check the color of the indicating silica gel to see if they have changed from blue to pink. Once they turn pink, you can easily reactivate them by placing them in the oven for 0.5 to 3 hours at 200°F--250°F (not over 250°F). Actual reactivation time may be shorter depending on the condition of the silica gel. Remember to check the color of the silica gel for proper reactivation.\r\nGreat Absorbing Capacity - When used in an air-tight sealed container, our indicating silica gel has a general estimate of protecting up to 30 cubic ft of enclosed storage space for every 40 grams of active gel.\r\n\r\nVersatile Application - Indicating silica gel is widely used to protect various enclosed storage spaces including safes, toolboxes, 3D printer filament storage boxes, weapon cases, closets, and more. With 2lbs of indicating silica gel, you can effectively prevent moisture damage to guns, important documents, collectibles, books, jewelry, photo albums, shoes, camera lenses, toys, leather clothing, ammunition, photo equipment, and air dryer systems.', '', 13, '61DU3P5VDcL._SX569_.jpg', '71h5r186WGL,_SL1280__enhanced.jpg', '81ahRLE1QbL._SL1500_.jpg', '51-UJuRVzEL._SX450_.jpg', '', '', '', '', '0.20', '10', '10', '10', '500 gram', '1234', 'QUANTITY - 1000 Gram Crystal Size (6-12mm) | \r\nColor- Blue\r\n\r\nIndicating Silica Gel Crystal - Elysian blue indicating Silica gel (6-12mm in size) are designed to change color within a humidity range of 20%-50%. Once saturated with moisture, the Crystal will complete the color change to pink. It\'s important to note that the initial color change does not indicate full saturation. Silica gel will continue to absorb moisture until reaching 50%RH. We recommend periodically checking the silica gel to ensure their effectiveness.\r\n\r\nEasy to Reactivate - Indicating Silica gel are 6-12mm in size and have a vibrant blue color. Simply check the color of the indicating silica gel to see if they have changed from blue to pink. Once they turn pink, you can easily reactivate them by placing them in the oven for 0.5 to 3 hours at 200°F--250°F (not over 250°F). Actual reactivation time may be shorter depending on the condition of the silica gel. Remember to check the color of the silica gel for proper reactivation.\r\nGreat Absorbing Capacity - When used in an air-tight sealed container, our indicating silica gel has a general estimate of protecting up to 30 cubic ft of enclosed storage space for every 40 grams of active gel.\r\n\r\nVersatile Application - Indicating silica gel is widely used to protect various enclosed storage spaces including safes, toolboxes, 3D printer filament storage boxes, weapon cases, closets, and more. With 2lbs of indicating silica gel, you can effectively prevent moisture damage to guns, important documents, collectibles, books, jewelry, photo albums, shoes, camera lenses, toys, leather clothing, ammunition, photo equipment, and air dryer systems.', '740', 60, 0, 'Out of Stock');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `Id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `productId` int(11) NOT NULL,
  `reviewTitle` varchar(500) NOT NULL,
  `review` text NOT NULL,
  `rating` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `img1` varchar(500) NOT NULL,
  `img2` varchar(500) NOT NULL,
  `img3` varchar(500) NOT NULL,
  `img4` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`Id`, `name`, `productId`, `reviewTitle`, `review`, `rating`, `timestamp`, `img1`, `img2`, `img3`, `img4`) VALUES
(3, 'Raj Gupta', 4, 'Good Product!!', 'This is very nice microscope.', 4, '2024-06-26 08:16:12', 'microscope.jpg', 'microscope.jpg', 'microscope.jpg', 'microscope.jpg'),
(5, 'Sonam Gupta', 26, 'nice', 'Nice Product....', 4, '2024-07-18 13:37:30', 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg', 'Civil Lab Equipments.jpg'),
(6, 'Shivani Sharma', 10, 'Perfect!', 'Size is accurate and quality is top notch.', 5, '2024-07-20 10:42:39', '41lbPv-Qi2L.jpg', '513BoKIx81L._SY250_.jpg', '41lbPv-Qi2L.jpg', '41lbPv-Qi2L.jpg'),
(8, 'Radhika', 1, 'Lajawaab', 'Bahut aacha product hai..', 5, '2024-10-13 08:27:57', 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg', 'weldingglubs.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `save_selected_categories`
--

CREATE TABLE `save_selected_categories` (
  `Id` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `save_selected_categories`
--

INSERT INTO `save_selected_categories` (`Id`, `categoryId`) VALUES
(1, 1),
(2, 4),
(3, 7),
(4, 8),
(5, 9),
(6, 10),
(7, 19),
(8, 21),
(9, 24),
(10, 9),
(11, 7),
(12, 10),
(13, 21);

-- --------------------------------------------------------

--
-- Table structure for table `subscribing_user`
--

CREATE TABLE `subscribing_user` (
  `Id` int(11) NOT NULL,
  `email` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscribing_user`
--

INSERT INTO `subscribing_user` (`Id`, `email`) VALUES
(3, 'divya@gmail.com'),
(5, 'sharmashruti@gmail.com'),
(6, 'ram@gmail.com'),
(7, 'example@gmail.com'),
(8, 'testing@gmail.com'),
(9, 'shruti.sarovi@gmail.com'),
(10, 'shruti@gmail.com'),
(11, 'abc@gmail.com'),
(12, 'testing@gmail.com'),
(13, 'shruti.sarovi@gmail.com'),
(14, 'testing1@gmail.com'),
(15, 'shiksha@gmail.com'),
(16, 'shruti.sarovi@gmail.com'),
(17, 'er.shrutidsharma@gmail.com'),
(20, 'vaibhavdsharma26@gmail.com'),
(33, 'er.shrutidsharma@gmail.com'),
(34, 'engineershayra3011@gmail.com'),
(35, 'testing@gmail.com'),
(36, 'er.shruti3011@gmail.com'),
(38, 'shruti.sarovi@gmail.com'),
(40, 'shrutidsharma@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `registration_date` date NOT NULL DEFAULT current_timestamp(),
  `verification_status` varchar(20) NOT NULL DEFAULT 'Unverified',
  `verification_token` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `name`, `email`, `password`, `gender`, `phone`, `registration_date`, `verification_status`, `verification_token`) VALUES
(1, 'Shruti Sharma', 'shruti.sarovi@gmail.com', '$2y$10$bcHa.EHCj3Bmcp5pCNU77OOi4sCBCf3SQLV0Xe2TmE4GlHNeVP2s2', '', '7987361186', '2024-11-19', 'Unverified', 'e051fd840864e7c79c281e9559e8e843'),
(2, 'Shruti Sharma', 'sharmashruti3011@gmail.com', '$2y$10$AUpnkw4u.sJTCTcAJrQKye6hs2WSixTQjCy/ay3Sk89vdkVI4rrdm', '', '7987361186', '2024-11-20', 'Verified', '49c415a4bacf3a34c2bd0dfe882a4d45'),
(3, 'Saurabh Singh', 'saurabh.sarovi@gmail.com', '$2y$10$DfE9HrvwDk4LQwOa0tP7X.ykAWZ3gpSKLr0.Y6T89HRB/5z2M.r.G', '', '8497262672', '2024-11-21', 'Verified', '0458229157b0ed45817b7cf2a5f8bf9f'),
(8, 'Shruti Sharma', 'er.shrutidsharma@gmail.com', '$2y$10$j81SqdR7Nlg0u1tU9E6xOev/zsCqwW.yVG5SKOLWmOzqb5VNIKcxW', '', '7987361186', '2024-12-03', 'Verified', '87e8b8c87bf284ede1cc195023a53b45');

-- --------------------------------------------------------

--
-- Table structure for table `useraddress`
--

CREATE TABLE `useraddress` (
  `addressId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `FullName` varchar(300) NOT NULL,
  `Number` varchar(10) NOT NULL,
  `Pincode` varchar(6) NOT NULL,
  `State` varchar(300) NOT NULL,
  `Address1` varchar(1000) NOT NULL,
  `Address2` varchar(1000) NOT NULL,
  `Address3` varchar(1000) NOT NULL,
  `City` varchar(500) NOT NULL,
  `Landmark` varchar(500) NOT NULL,
  `GSTIN` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `useraddress`
--

INSERT INTO `useraddress` (`addressId`, `UserId`, `FullName`, `Number`, `Pincode`, `State`, `Address1`, `Address2`, `Address3`, `City`, `Landmark`, `GSTIN`) VALUES
(1, 1, 'Ravi Sharma', '7342342122', '453661', 'Madhya Pradesh', 'Shree Shradda Garden, A.B Road ', 'Indore<MP>', 'Mhow , A>B Road', 'Indore', 'Near Garden', ''),
(2, 1, 'Ravi Sharma', '5463323222', '453661', 'Madhya Pradesh', 'Near Govt. HS School, Main Road ', '', '', 'Dewas', '', ''),
(3, 1, 'Shubham Sharma', '6432423421', '456221', 'Madhya Pradesh', 'Mali Mohalla Harsola', '', '', 'Indore', '', ''),
(4, 3, 'Aman Pathak', '7384212323', '453661', 'Madhya Pradesh', 'Sitapath village, A.B Road , Jamli', '', '', 'Indore', '', ''),
(5, 1, 'Ravi Sharma', '7483011212', '532211', 'Madhya Pradesh', 'Mhow', '', '', 'Indore', '', ''),
(6, 5, 'Shruti Sharma', '6435362423', '453661', 'Madhya Pradesh', 'Shree Mithiya Balaji Mandir , Hasalpur', 'Mhow', '', 'Indore', 'Janapav Hill Station', ''),
(7, 5, 'Shruti Sharma', '7855432211', '453661', 'Madhya Pradesh', 'Shree Mithiya Balaji Mandir , Hasalpur', '', '', 'Indore', '', ''),
(8, 5, 'Ragini Sharma', '5434332222', '453661', 'Madhya Pradesh', 'Sitapath village, A.B Road , Jamli', '', '', 'Indore', '', ''),
(9, 4, 'Sakshi Malviya', '7742311212', '656341', 'Punjab', 'Amaravati Nagar, Punjab', '', '', 'Jalandhar', '', ''),
(10, 6, 'Vaibhav Sharma', '7832242282', '732323', 'Maharashtra', 'Hinjewadi,phase2 ,Pune', '', '', 'Pune', '', ''),
(11, 8, 'Raghav Patidar', '7197224622', '453661', 'Kerala', '1625 Berry Street', 'Colorado', '', 'Gardner', '', ''),
(12, 12, 'Chandan Rathore', '9323832733', '837426', 'Meghalaya', 'Shantanu Street 312, A.B Road', '', '', 'Shillong', '', ''),
(13, 13, 'Kamlesh Patidar', '4535345321', '453661', 'Madhya Pradesh', '223,A.B Road Rau', '', '', 'Indore', '', ''),
(14, 18, 'Sonu ', '3432435322', '453661', 'Maharashtra', 'Shantanu Street 312, A.B Road', '', '', 'Pune', '', ''),
(15, 20, 'Abc Def', '123456789', '450211', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Kerala', '', ''),
(16, 20, 'Abc Def', '1234567899', '745334', 'Chhattisgarh', '223,A.B Road Rau', '', '', 'Raipur', '', ''),
(17, 19, 'Shruti  Sharma', '1234567899', '453661', 'Madhya Pradesh', '76,AB Road, Hasalpur', '', '', 'Indore', 'Near Petrol Pump', '232341'),
(19, 23, 'Rajesh Sharma', '7834323421', '462016', 'Madhya Pradesh', 'Bansal Hospital, Shahpura, Bhopal, Madhya Pradesh 462016, India', '', '', 'Bhopal', '', ''),
(21, 27, 'Shruti Sharma', '7987361186', '453661', 'Madhya Pradesh', 'Hasalpur', '', '', 'Indore', '', ''),
(22, 27, 'Shruti Sharma', '8786767551', '462002', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Bhopal', '', ''),
(23, 28, 'Manisha Sharma', '7948374362', '411001', 'Maharashtra', '223,A.B hinjewadi, pune', '', '', 'Pune', '', ''),
(24, 28, 'Manisha', '1234567899', '453661', 'Madhya Pradesh', 'Hasalpur', '', '', 'Indore', '', ''),
(25, 21, 'Engineer Shayra', '7987361186', '453661', 'Madhya Pradesh', 'Hasalpur', '', '', 'Indore', '', ''),
(26, 21, 'Engineer Shayra', '7866745234', '452009', 'Madhya Pradesh', 'Indore', '', '', 'Indore', '', ''),
(27, 30, 'Dinesh Sharma', '9438237341', '453331', 'Madhya Pradesh', 'Harsola', '', '', 'Indore', '', ''),
(31, 33, 'Manav', '7849223432', '411001', 'Maharashtra', '223,A.B hinjewadi, pune', '', '', 'Pune', '', ''),
(32, 26, 'Sagar bhavel', '8537583234', '452009', 'Madhya Pradesh', '1625 Berry Indore', '', '', 'Indore', '', ''),
(36, 26, 'sagar', '7878978671', '411001', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Indore', '', ''),
(37, 26, 'Sagar', '5345323212', '121206', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Indore', '', ''),
(38, 26, 'Sagar', '8972632321', '789112', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Indore', '', ''),
(39, 35, 'Shruti Sharma', '1234567891', '453661', 'Madhya Pradesh', 'Hasalpur', '', '', 'Indore', '', ''),
(45, 26, 'Sagar bhavel', '1234567890', '452013', 'Madhya Pradesh', 'Indore', '', '', 'Indore', '', ''),
(46, 26, 'Sagar Bhavel', '1234567890', '453661', 'Madhya Pradesh', 'Indore', '', '', 'Indore', '', ''),
(55, 39, 'Waltzer India', '1234567891', '452009', 'Madhya Pradesh', 'Indore', '', '', 'Indore', '', ''),
(56, 40, 'Arjun Bijlani', '1234567891', '453661', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Indore', '', ''),
(59, 41, 'Sarovi Intern', '1234567890', '453661', 'Madhya Pradesh', 'Bajrang Mohalla , Hasalpur', '', '', 'Indore', '', ''),
(60, 26, 'Shruti', '1234567890', '453661', 'Madhya Pradesh', 'Hasalpur, Mhow', '', '', 'Indore', '', ''),
(63, 19, 'Shruti Sharma', '7987361186', '452009', 'Madhya Pradesh', '1625 Berry Street', '', '', 'Indore', '', ''),
(65, 55, 'Shruti Sharma', '7987361186', '453661', 'Madhya Pradesh', 'Shop No. 1, Balaji Market, Hawa Bangla road,kundan nagar, Indore - 452013,', '', '', 'Indore', '', ''),
(66, 2, 'Shruti Sharma', '7987361186', '453661', 'Madhya Pradesh', 'Hasalpur', '', '', 'Indore', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_review`
--

CREATE TABLE `user_review` (
  `ReviewId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `heading` varchar(1000) NOT NULL,
  `images1` varchar(1000) NOT NULL,
  `images2` varchar(1000) DEFAULT NULL,
  `images3` varchar(1000) DEFAULT NULL,
  `images4` varchar(1000) DEFAULT NULL,
  `review` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_review`
--

INSERT INTO `user_review` (`ReviewId`, `UserId`, `ProductId`, `rating`, `heading`, `images1`, `images2`, `images3`, `images4`, `review`, `timestamp`) VALUES
(1, 2, 55, 3, 'Mst hai..', '51O-kXCzXfL._SX466_.jpg', '', '', '', 'It is a nice product.', '2024-11-21 11:32:29'),
(2, 2, 19, 5, 'It is a nice product.', '51O-kXCzXfL._SX466_.jpg', '', '', '', 'Bhut badhiya hai..', '2024-11-21 11:36:25'),
(8, 2, 10, 4, 'Nice product', '51O-kXCzXfL._SX466_.jpg', '', '', '', 'Mst gumboot hai', '2024-11-25 11:07:12'),
(9, 2, 13, 5, 'mst product hai......', '51O-kXCzXfL._SX466_.jpg', '', '', '', 'awesome product it is.', '2024-11-25 12:21:33'),
(10, 2, 54, 5, 'go for it.', '51O-kXCzXfL._SX466_.jpg', '', '', '', 'If you are looking for an awesome product then must go for it.', '2024-11-26 10:59:42'),
(11, 2, 57, 5, 'awesome product.', '51O-kXCzXfL._SX466_.jpg', NULL, NULL, NULL, 'Wow awesome product.', '2024-11-28 15:34:39'),
(12, 2, 51, 3, 'nice hai ', '51O-kXCzXfL._SX466_.jpg', 'img.jpg', NULL, NULL, 'Nice Product hai . ', '2024-11-28 16:30:29');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`Id`, `UserId`, `ProductId`) VALUES
(1, 0, 0),
(3, 0, 0),
(5, 0, 0),
(7, 0, 0),
(12, 0, 0),
(14, 0, 0),
(27, 19, 2),
(28, 19, 55),
(32, 55, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `password` (`password`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`bannerId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `OrderId` (`OrderId`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `defaultbanner`
--
ALTER TABLE `defaultbanner`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `defaultbannernew`
--
ALTER TABLE `defaultbannernew`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `deliverycompany`
--
ALTER TABLE `deliverycompany`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `newarrival`
--
ALTER TABLE `newarrival`
  ADD PRIMARY KEY (`newArrival_Id`);

--
-- Indexes for table `newarrivalbanner`
--
ALTER TABLE `newarrivalbanner`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `oneproduct`
--
ALTER TABLE `oneproduct`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `OrderId` (`OrderId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `save_selected_categories`
--
ALTER TABLE `save_selected_categories`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `subscribing_user`
--
ALTER TABLE `subscribing_user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`,`password`),
  ADD UNIQUE KEY `password` (`password`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `password_2` (`password`);

--
-- Indexes for table `useraddress`
--
ALTER TABLE `useraddress`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `user_review`
--
ALTER TABLE `user_review`
  ADD PRIMARY KEY (`ReviewId`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `bannerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `defaultbanner`
--
ALTER TABLE `defaultbanner`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `defaultbannernew`
--
ALTER TABLE `defaultbannernew`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `deliverycompany`
--
ALTER TABLE `deliverycompany`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `newarrival`
--
ALTER TABLE `newarrival`
  MODIFY `newArrival_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `newarrivalbanner`
--
ALTER TABLE `newarrivalbanner`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `oneproduct`
--
ALTER TABLE `oneproduct`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `save_selected_categories`
--
ALTER TABLE `save_selected_categories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `subscribing_user`
--
ALTER TABLE `subscribing_user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `useraddress`
--
ALTER TABLE `useraddress`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `user_review`
--
ALTER TABLE `user_review`
  MODIFY `ReviewId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `checkout` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
