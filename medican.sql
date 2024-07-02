-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 09:05 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medican`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `company_email` varchar(100) NOT NULL,
  `company_code` varchar(100) NOT NULL,
  `company_website` varchar(100) NOT NULL,
  `company_contact` varchar(100) NOT NULL,
  `company_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `user`, `company_name`, `company_email`, `company_code`, `company_website`, `company_contact`, `company_address`) VALUES
(6, '03060840812', 'ponstan', 'email@gmail.com', '12344', 'www.ponstan.com', '12344', 'address of the company'),
(7, '03320612512', '754', '547547@gmail.com', '574754', '547.com', '7547547', 'DNQWJDHWQUDH'),
(8, '03056051223', 'Tayyab', 'hamzaraowaseem0123@gmail.com', '5347', '58ituyjgvh.com', '03056051223', 'bahawliiu'),
(9, '03056051223', '54745', 'hamzaraowaseem0123@gmail.com', '754754754745754754754754754745', '563.com', '54754754754', '54yreey4y'),
(10, '03056051223', 'yusuf', 'hamzaraowaseem0123@gmail.com', 'edrbgf', '563.com', '54745754754', 'eryeryery');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `invoice_no` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `sub_total` varchar(100) NOT NULL,
  `discount` varchar(100) NOT NULL,
  `net_total` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_contact` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `contact`, `invoice_no`, `date`, `time`, `type`, `sub_total`, `discount`, `net_total`, `customer_name`, `customer_contact`) VALUES
(1, '03320612512', '457', '2024-05-16', '1715837612', 'purchase', '4653.00', '00', '4653.00', '', ''),
(2, '03320612512', '1', '2024-05-16', '1715837651', 'sale', '3.60', '0', '3.60', 'tyuty8', '6585'),
(3, '03320612512', '2', '2024-05-16', '1715838186', 'sale', '46.80', '0', '46.80', 'tru', '54'),
(4, '03056051223', '367', '2024-05-16', '1715842151', 'purchase', '4.00', '00', '4.00', '', ''),
(5, '03056051223', '1', '2024-05-16', '1715842255', 'sale', '4.75', '0', '4.75', 'tayyab', '03506051223'),
(6, '03056051223', '4', '2024-05-16', '1715842443', 'purchase', '45.00', '00', '45.00', '', ''),
(7, '03056051223', '13153', '2024-05-16', '1715842717', 'purchase', '67.00', '00', '67.00', '', ''),
(8, '03056051223', '754', '2024-05-16', '1715842769', 'purchase', '7547.00', '00', '7547.00', '', ''),
(9, '03056051223', '745', '2024-05-16', '1715842892', 'purchase', '7658.00', '00', '7658.00', '', ''),
(10, '03056051223', '574', '2024-05-16', '1715842984', 'purchase', '54.00', '00', '54.00', '', ''),
(11, '03056051223', '745', '2024-05-16', '1715843164', 'purchase', '745.00', '00', '745.00', '', ''),
(12, '03056051223', '856', '2024-05-16', '1715843197', 'purchase', '865.00', '00', '865.00', '', ''),
(13, '03056051223', '754', '2024-05-16', '1715844088', 'purchase', '475.00', '00', '475.00', '', ''),
(14, '03056051223', '754', '2024-05-16', '1715844211', 'purchase', '745.00', '00', '745.00', '', ''),
(15, '03056051223', '2', '2024-05-16', '1715844279', 'sale', '8.10', '0', '8.10', '634', '436'),
(16, '03056051223', '3', '2024-05-16', '1715844362', 'sale', '8.10', '0', '8.10', 'yr', '754'),
(17, '03056051223', '4', '2024-05-16', '1715844417', 'sale', '10.80', '0', '10.80', 'ytr', '745'),
(18, '03056051223', '754', '2024-05-16', '1715844443', 'purchase', '745.00', '00', '745.00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `usercontact` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `pieces` varchar(50) NOT NULL,
  `remarks` text NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `usercontact`, `name`, `company`, `barcode`, `unit`, `pieces`, `remarks`, `image`) VALUES
(1, '03320612512', 'EWTW6', '754', '343436', '6436', 'Pieces', '43TRET43', '4K-Car-Wallpaper-High-Resolution.jpg'),
(5, '03056051223', '86556', 'Tayyab', '967', '8', 'Pieces', '865', 'png-clipart-white-acura-nsx-gt3-sports-car-2017-ac');

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `invoice_id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `total_quantity` varchar(100) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `packing` varchar(100) NOT NULL,
  `box_cost` varchar(100) NOT NULL,
  `item_cost` varchar(100) NOT NULL,
  `box_price` varchar(100) NOT NULL,
  `item_price` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `profit` varchar(100) NOT NULL,
  `barcode` varchar(100) NOT NULL,
  `expiry` varchar(100) NOT NULL,
  `purchase_date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`id`, `contact`, `invoice_id`, `name`, `company`, `total_quantity`, `quantity`, `packing`, `box_cost`, `item_cost`, `box_price`, `item_price`, `total`, `profit`, `barcode`, `expiry`, `purchase_date`) VALUES
(1, '03320612512', 1, 'EWTW6', '754', '6436', '1', '6366', '4653', '0.72', '4636', '0.72', '4653.00', '0.00', '343436', '2024-05-16', '2024-05-16'),
(2, '03056051223', 4, 'panadol', 'Tayyab', '20', '1', '1', '4', '0.20', '5', '0.25', '4.00', '0.05', '5', '2024-06-15', '2024-05-16'),
(3, '03056051223', 6, 'panadol', 'Tayyab', '20', '1', '13', '45', '2.25', '54', '2.70', '45.00', '0.45', '5', '2024-05-16', '2024-05-16'),
(4, '03056051223', 7, 'panadol', 'Tayyab', '20', '1', '20', '67', '3.35', '58', '2.90', '67.00', '-0.45', '5', '2024-05-16', '2024-05-16'),
(5, '03056051223', 8, 'panadol', 'Tayyab', '20', '1', '17', '7547', '377.35', '54', '2.70', '7547.00', '-374.65', '5', '2024-05-16', '2024-05-16'),
(6, '03056051223', 9, 'panadol', 'Tayyab', '280', '14', '280', '547', '1.95', '754', '2.69', '7658.00', '0.74', '5', '2024-05-16', '2024-05-16'),
(7, '03056051223', 10, 'panadol', 'Tayyab', '20', '1', '20', '54', '2.70', '745', '37.25', '54.00', '34.55', '5', '2024-05-16', '2024-05-16'),
(8, '03056051223', 11, 'panadol', 'Tayyab', '20', '1', '20', '745', '37.25', '754', '37.70', '745.00', '0.45', '5', '2024-05-16', '2024-05-16'),
(9, '03056051223', 12, 'panadol', 'Tayyab', '20', '1', '20', '865', '43.25', '856', '42.80', '865.00', '-0.45', '5', '2024-05-16', '2024-05-16'),
(10, '03056051223', 13, '86556', 'Tayyab', '8', '1', '8', '475', '59.38', '745', '93.13', '475.00', '33.75', '967', '2024-05-16', '2024-05-16'),
(11, '03056051223', 14, '86556', 'Tayyab', '8', '1', '8', '745', '93.13', '4757', '594.63', '745.00', '501.50', '967', '2024-05-16', '2024-05-16'),
(12, '03056051223', 18, '86556', 'Tayyab', '8', '1', '8', '745', '93.13', '547', '68.38', '745.00', '-24.75', '967', '2024-05-16', '2024-05-16');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `invoice_id` varchar(100) NOT NULL,
  `user_contact` varchar(100) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_price` varchar(100) NOT NULL,
  `quantity` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`id`, `invoice_id`, `user_contact`, `item_name`, `item_price`, `quantity`, `total`, `date`) VALUES
(1, '2', '03320612512', 'EWTW6', '0.72', '5', '3.60', '2024-05-16'),
(2, '3', '03320612512', 'EWTW6', '0.72', '65', '46.80', '2024-05-16'),
(3, '5', '03056051223', 'panadol', '0.25', '19', '4.75', '2024-05-16'),
(4, '15', '03056051223', 'panadol', '2.70', '3', '8.10', '2024-05-16'),
(5, '16', '03056051223', 'panadol', '2.70', '3', '8.10', '2024-05-16'),
(6, '17', '03056051223', 'panadol', '2.70', '4', '10.80', '2024-05-16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cell` varchar(100) NOT NULL,
  `CNIC` varchar(100) NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `cell`, `CNIC`, `store_name`, `address`, `contact`, `logo`) VALUES
(1, 'Hamza Waseem', 'Death', '1509', '03320612512', '00000000000', 'Death Medical Complex', 'Baldia Road Bahawal Nagar', '+92-333-6300-652', 'Death.png'),
(2, 'YUSUF', 'yusuf', '12344', '03060840812', '3110166012661', 'Yusuf Super Store', 'address', '03060840812', 'Death.png'),
(3, 'trutru', 'hamza', '1234', '75475475574', '7457547547547', '', '545ytru65', '65754uytu7', '03-Photoroom.png-Photoroom.png'),
(4, 'trutru', 'hamza', '1234', '75475475574', '7457547547547', '7545rytruy57', '545ytru65', '65754uytu7', '03-Photoroom.png-Photoroom.png'),
(5, 'Muhammad Usman', 'Usman', '2565', '03358581185', '0333333333333', 'Usman Medical Complex', 'Madina Town', '03358581185', 'png-transparent-2012-aston-martin-v8-vantage-aston-martin-vantage-gt4-aston-martin-vanquish-others-c'),
(6, 'Tayyab Ali', 'Tayyab', '4221', '03056051223', '3110280964505', 'nayab', 'bahawli', '03358581185', '39356375000_9bb4c404d9_h-Photoroom.png-Photoroom.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
