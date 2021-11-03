-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 03, 2021 at 08:45 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `time_comment` datetime NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(30) NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `image` varchar(250) NOT NULL,
  `time_post` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `user_id`, `content`, `image`, `time_post`) VALUES
(1, 'test', 42, 'hello je test ', './images/groupomania.png', '2021-09-16 14:36:13'),
(2, 'New test', 9, 'Je poste un nouveau test ', './upload/plage.jpg', '2021-10-13 16:13:20'),
(3, 'test profile post', 49, 'voici un test pour essayer d\'afficher les post du membre en question sur son profile', './upload/tour-eiffel.jpg', '2021-10-22 17:37:16'),
(4, 'tourcoing', 49, 'voici tourcoing', './upload/plage.jpg', '2021-10-25 08:13:20'),
(5, 'tourcoing', 49, 'voici tourcoing', 'http://localhost:3000/images/tourcoing_1635337654561.png', '2021-10-27 14:27:34'),
(6, 'new test', 49, 'yoyoyo', 'http://localhost:3000/images/tourcoing_1635339235356.png', '2021-10-27 14:53:55'),
(7, 'test', 49, 'test', 'http://localhost:3000/images/tourcoing_1635339673899.png', '2021-10-27 15:01:13'),
(8, 'test', 49, 'test3', 'http://localhost:3000/images/tourcoing_1635339777383.png', '2021-10-27 15:02:57'),
(9, 'new test', 49, 'test2', 'http://localhost:3000/images/tourcoing_1635363064082.png', '2021-10-27 21:31:04'),
(10, 'tourcoing', 49, 'voici tourcoing', 'http://localhost:3000/images/tourcoing_1635373403731.png', '2021-10-28 00:23:23'),
(11, 'testsoir', 49, 'test4', 'http://localhost:3000/images/erreur_addpost2_1635373643352.jpg', '2021-10-28 00:27:23'),
(12, 'kevin', 49, 'test2', 'http://localhost:3000/images/erreur_addpost2_1635373692750.jpg', '2021-10-28 00:28:12'),
(13, 'new test', 49, 'yoyoyo', 'http://localhost:3000/images/erreur_addpost1_1635373718265.jpg', '2021-10-28 00:28:38'),
(14, 'test', 49, 'est le roi', 'http://localhost:3000/images/addpostproblem3_1635426008205.jpg', '2021-10-28 15:00:08'),
(15, 'test', 49, 'test', 'http://localhost:3000/images/addpostproblem2_1635428024736.jpg', '2021-10-28 15:33:44'),
(17, '', 49, '', 'http://localhost:3000/images/tourcoing_1635766499670.png', '2021-11-01 12:34:59'),
(18, '', 49, '', 'http://localhost:3000/images/tourcoing_1635766650417.png', '2021-11-01 12:37:30'),
(19, '', 49, '', 'http://localhost:3000/images/index_1635928606536.jpg', '2021-11-03 09:36:46');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `emailMasked` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `dateSignup` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roles` varchar(6) NOT NULL DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `firstname`, `emailMasked`, `email`, `password`, `dateSignup`, `roles`) VALUES
(4, 'teste', 'kevin', 'ke***@***********.fr', 'kevin@groupomania.fr', '$2b$10$TbNoqdyVm1DovCushIbkROeyWxZ3EFfLiJsiiCTZCr0CUCZqkoI3a', '2021-08-31 12:54:04', 'member'),
(5, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$BQfjFrDTuYZTZsq4KKccDeEeLMDqNx/kpLMTOWvZOhXlaUqXd.0Hy', '2021-08-31 12:54:04', 'member'),
(6, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$l09oa59fq0QPRHQ8HokuaufbbNZ6K7FJZ5iEfEi1Je9EUnSkbUw9.', '2021-08-31 12:54:04', 'member'),
(7, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$jQSrPcA/90QFyANVpWWTX.60bgqAG4Hmth4LnHnBRrfq6fY/z.aFm', '2021-08-31 12:54:04', 'member'),
(8, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$kp9c5vy3ElW92jKpHE6Rdu0d81AU/zNYOhCACri63ugYSiYSlaigC', '2021-08-31 12:54:04', 'member'),
(9, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$oYkbaZa7mDdShSeyCTuIZusMs4zQT5HphZu7DOEPtOfT4L0/Nb3YW', '2021-08-31 12:55:27', 'member'),
(10, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$MmI7r6NKKsoN5OWuG0xsXOeue48Ozd7ibgc8CqYQYBLeYzJOKg0b.', '2021-08-31 14:10:16', 'member'),
(11, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$jprpWn7JevDazCf88Nw8oucAGpjKpKSVuA/ozaLa05qBz8tpfwcxW', '2021-08-31 14:10:21', 'member'),
(12, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$hNwK8XKcW/92nrMFoRhUEObL263TYIforrxOKkbYhx1Mxucvppgua', '2021-08-31 14:28:36', 'member'),
(13, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$T9C5biLEEJfla4b0OJ7KTucEfGUALFzesS.PYtIRV.y1WOGBygOZG', '2021-08-31 14:49:02', 'member'),
(14, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$qolxAR.JZA6iKMTdb4G10OXNGrOGcuttUMD1lEA1pOJeA9xS6YyUC', '2021-08-31 16:10:43', 'member'),
(15, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$z.H4VmTSQU14zv36fPF.e.FrI.6HWxqL4suNb/3UWbQ3SGjZMmmqW', '2021-08-31 16:10:45', 'member'),
(16, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$lzUHaIaMLUwuTzBskJcYRu/39azHWQm1k7Q4olijo.9lAwgpTQnde', '2021-08-31 16:12:05', 'member'),
(17, 'toto', 'titi', 'to**@***********.fr', 'toto@groupomania.fr', '$2b$10$I34rDS3TXvD4UPP156xbVOxcqkx/W.gAxo4imrHpHrBKS8Zu.Wf4O', '2021-08-31 16:35:57', 'member'),
(18, 'toto', 'titi', 'ti**@***********.fr', 'titi@groupomania.fr', '$2b$10$79zVVpZdy8ycV8ap9obpdOchksAOnk3JNcRAjzvRmcDhpYd1Zp9uO', '2021-08-31 17:04:30', 'member'),
(19, '###', '!!!', 'ti***@***********.fr', 'titou@groupomania.fr', '$2b$10$MOHEjIR5o4fGIbghdlzAQurTfnKjAoVZRhRLommy8mCGdJeM8WeS6', '2021-09-01 14:13:55', 'member'),
(20, 'kevin', 'kev', 'ti****@***********.fr', 'tituou@groupomania.fr', '$2b$10$OdagVPD85birT4C3hITPSuAYfNZCUszjYv4T6Vq0Cin2/DSz6Iubm', '2021-09-08 14:38:11', 'member'),
(21, 'druart', 'michel', 'mi****@***********.fr', 'michel@groupomania.fr', '$2b$10$hnf0i7xfaN3qOu6Jyf0uUeuXucm3tYBHwSq8Jt4fpGwexnecuSQI6', '2021-09-08 22:30:06', 'member'),
(22, 'druart', 'dany', 'da**@***********.fr', 'dany@groupomania.fr', '$2b$10$EuQW/QeOUKSktombcH6xduZgPyKV8nOP.ej3a.5JG8kY7qm0ke2oi', '2021-09-08 22:33:33', 'member'),
(23, 'mich', 'mich', 'mi**@***********.fr', 'mich@groupomania.fr', '$2b$10$gkiGg5xeG8CbZTLIpqWEVepdGdfGUlIOTxAlBEPsLzElwrlt0xzee', '2021-09-08 22:35:39', 'member'),
(24, 'kevin', 'druart', 'dr****@***********.fr', 'druart@groupomania.fr', '$2b$10$seNlDSSMODw8PdGQT91L6eycgW9SI93A7nVahvmEWBxrybbOmAkDm', '2021-09-08 22:37:00', 'member'),
(25, 'test', 'redir', 'ec****@***********.fr', 'ection@groupomania.fr', '$2b$10$zceFtp0/ILJJbMBbZGvDJueVFG1KJn88Gc4aA6tEvglw25f5SlhpG', '2021-09-08 22:41:57', 'member'),
(26, 'coucou', 'bonjour', 'co****@***********.fr', 'coucou@groupomania.fr', '$2b$10$C8.2ZrBIMUwnbu1gKMWi1O2L8mOWyEdIEa3lYackucvxlCD286LEm', '2021-09-08 23:27:21', 'member'),
(27, 'druart', 'george', 'ge****@***********.fr', 'george@groupomania.fr', '$2b$10$Zoe/ST9fo8CWj1ggzKPySOGmNYlcdzFZIxBFM5pNx/9ObNIi4/pSW', '2021-09-15 12:21:39', 'member'),
(28, 'druart', 'daniel', 'da****@***********.fr', 'daniel@groupomania.fr', '$2b$10$Kd6Fc7Yk7s.qfo2RngdgIux40LVovXD5SyBKydGIH2YFXJttGcwUu', '2021-09-15 13:28:14', 'member'),
(29, 'druart', 'monique', 'mo*****@***********.fr', 'monique@groupomania.fr', '$2b$10$7ENhb0SkSKdwUg3GmGIR8.we10vHU/IlYswN1fHcMJTCiFKC8j04y', '2021-09-15 13:43:52', 'member'),
(30, 'druart', 'dominique', 'do*******@***********.fr', 'dominique@groupomania.fr', '$2b$10$m41DdOU9s1syadNgLGfyLeEPyEDo5aZYgUpwJI77ApcCN8OE6lAEq', '2021-09-15 13:45:38', 'member'),
(31, 'druart', 'dominique', 'do**@***********.fr', 'domi@groupomania.fr', '$2b$10$cqZabvqiCy1mfEisYbkR.eRCGKp8Oa3cE//hiLX8O0Zp2OrJZw7PG', '2021-09-15 13:46:32', 'member'),
(32, 'druart', 'dominique', 'lu***@***********.fr', 'lucas@groupomania.fr', '$2b$10$ndugvAteNbjOw98rDCr.aODIRhmQ27N6B02Wu0Q3jFb2FS0lGqOPW', '2021-09-15 13:47:18', 'member'),
(33, 'druart', 'dominique', 'se*@***********.fr', 'seb@groupomania.fr', '$2b$10$Ys8F9ZCCEHwRB0UJIwLtJ.gd6AjjL4e9xtWpAlxlYsYJLSGN42trO', '2021-09-15 13:48:11', 'member'),
(34, 'druart', 'dominique', 'na******@***********.fr', 'nathalie@groupomania.fr', '$2b$10$lBcnuvOwF1yo10qDz0xssuqezl0mn5xMdAYcAfIVZB.99HrWPrTua', '2021-09-15 13:49:34', 'member'),
(35, 'druart', 'dominique', 'je**@***********.fr', 'jean@groupomania.fr', '$2b$10$b24LY58WAQKkk6pwPHkNM.hQpvd30JszxITOk1tFnPK3NKcbraTl2', '2021-09-15 13:50:14', 'member'),
(36, 'o', 'Élodie', 'je********@***********.fr', 'jeanmichel@groupomania.fr', '$2b$10$rNa5f5ktxeVtbYpzAlk7.edx8QkYk71EoBItDxPCg4LFLYywjjtfm', '2021-09-15 14:18:13', 'member'),
(37, 'druart', 'kevin', 'fr**@***********.fr', 'fred@groupomania.fr', '$2b$10$L3yNNI7vzPJJDrX6t4lehuaAW4/CVtcvbz1f5yZcBdyoVSYWS9Kza', '2021-09-15 14:24:41', 'member'),
(38, 'druart', 'cecile', 'ce****@***********.fr', 'cecile@groupomania.fr', '$2b$10$CZ7w7p3rdmA4GDPvM5eQIunHrly/HCqYTkg6Z9oiYJcssWEULiND.', '2021-09-15 15:19:16', 'member'),
(39, 'druart', 'julien', 'ju****@***********.fr', 'julien@groupomania.fr', '$2b$10$YFpew/Z0.Pik0zsOW3ff7OwfG/jafAQuTariwJAqbMDCU16pG80WW', '2021-09-15 15:19:55', 'member'),
(40, 'druart', 'amandine', 'am******@***********.fr', 'amandine@groupomania.fr', '$2b$10$N13pegWWRWRnc0SYj8pI6O0XPQSzMFY.2/Q1Nb6Oeq5DD0Bdi7A9K', '2021-09-15 15:21:55', 'member'),
(41, 'druart', 'brayan', 'br****@***********.fr', 'brayan@groupomania.fr', '$2b$10$CCmc2iMcxK7K8ni.QzNR3uHGzKRnnf4NoeBZdb3DZVmAaKF8kGbQq', '2021-09-15 15:24:57', 'member'),
(42, 'druart', 'chevre', 'ch****@***********.fr', 'chevre@groupomania.fr', '$2b$10$Mn0UYDf9hVTPC4C3FT3IGu6RhiS7J0Er0VwQn0BPftP6j7VScsQ3.', '2021-09-15 23:21:05', 'member'),
(43, 'kevin', 'kev', 'ti*******@***********.fr', 'tituhgfou@groupomania.fr', '$2b$10$DtfTkKo5n72E3UFbLzDQuOpHXbsrsbIF4mdHaKnu8uVD3uLe7rvn.', '2021-10-07 00:51:49', 'member'),
(44, 'kevin', 'kev', 'ti****@***********.fr', 'titaou@groupomania.fr', '$2b$10$8i4kIgbarYDT2bUuk/i4yeKTGrTh5LwDnl0JaTHdSibYmM1Qg798a', '2021-10-07 11:12:45', 'member'),
(45, 'Druart', 'Kevin', 'ke*******@***********.fr', 'kevintest@groupomania.fr', '$2b$10$sMJ6vLbKVHDZlE6KcOTx/ubhhAnHqPQkAmoF5sHVr1GXSQAbEjbNi', '2021-10-07 13:00:11', 'member'),
(46, 'DRUART', 'KEVIN', 'mi*******@***********.fr', 'micheline@groupomania.fr', '$2b$10$F.c41J/8xHx.hPRA.gjY7O79LKJG2PsIwsgtl.scOSedadL1iV8Wu', '2021-10-07 14:57:55', 'member'),
(47, 'Druart', 'Kevin', 'tt***@***********.fr', 'ttito@groupomania.fr', '$2b$10$faGSawVeeBoIJ0ty9PWzye5EO5gWLc1/L6fw/Efzn6xlm5D3CD0da', '2021-10-13 14:09:15', 'member'),
(48, 'Druart', 'Kevin', 'ta**@***********.fr', 'tato@groupomania.fr', '$2b$10$HFgzn7rHLz0p/fAQ7zY1EuCUei.Gbtbq7ZMm1Pn9etLVVOneeOhbu', '2021-10-13 14:09:30', 'member'),
(49, 'mich-mich', 'jean-claude', 'mi******@***********.fr', 'michelle@groupomania.fr', '$2b$10$zuVdpTk/KgnOY1TYUikPy.L.UOHs1iZ7xfs.OYap6DZXz/Li5wqGC', '2021-10-13 23:56:41', 'member'),
(50, 'druart', 'melodie', 'me**@***********.fr', 'melo@groupomania.fr', '$2b$10$w.BD9l1s0i1aFfO17f6h...EUTySAmEX37aIpXlLwKokk4uNzOimy', '2021-10-15 12:51:50', 'member'),
(51, 'bastos', 'mickael', 'mi*****@***********.fr', 'mickael@groupomania.fr', '$2b$10$oMbfoqRzAzd/tzRP4iiFoOmBhfEDbhrJVj1TzAqjl7e.xyqktLXre', '2021-10-15 12:55:47', 'member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_comment_id` (`user_id`),
  ADD KEY `fk_post_id` (`post_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_comment_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
