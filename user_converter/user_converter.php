<?php

/*
		CONVERTS USERS TO NEW JSOnTYPE (single file) || REQUIRED FOR USE WITH NEW VERSION OF CENNY.PHP
		******PUT THIS IN THE SAME DIRECTORY AS cenny.php AND LOAD URL IN A WEB BROWSER. REMOVE AFTER CONVERTING.

*/

function delete_files($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				if (filetype($dir . "/" . $object) == "dir")
					rrmdir($dir . "/" . $object);
				else
					unlink($dir . "/" . $object);
			}
		}
		reset($objects);
		rmdir($dir);
	}
}

function convert_user($username,$user_url,$group_url) {

	$should_continue = true;

	if (file_exists("$user_url/data.txt")) {
		$old_data = file_get_contents("$user_url/data.txt");
	} else {
		$old_data = "{}";
	}

	if (file_exists("$user_url/pass.txt")) {
		$old_pass = file_get_contents("$user_url/pass.txt");
	} else {
		$should_continue = false;
		$old_pass = "default";
	}

	if (file_exists("$user_url/permissions.txt")) {
		$old_permissions = file_get_contents("$user_url/permissions.txt");
	} else {
		$old_permissions = "{}";
	}

	if ($should_continue === true) {
		$user_data = '{"data":' . json_encode($old_data) . ',"pass":' . json_encode($old_pass) . ', "permissions":' . json_encode($old_permissions) . '}';
		file_put_contents("$group_url/$username.json",$user_data);
		delete_files($user_url);

	}

};

$groups = scandir("backend");
foreach ($groups as $group) {
	if (is_dir("backend/$group")) {
		$users = scandir("backend/$group");
		foreach ($users as $user) {
			if (is_dir("backend/$group/$user")) {
				convert_user($user,"backend/$group/$user", "backend/$group");
			} else {
				continue;
			}
		}
	} else {
		continue;
	}
}
?>

<html>
	<head>
		<style>

			/* http://meyerweb.com/eric/tools/css/reset/ 
			v2.0 | 20110126
			License: none (public domain)
			*/

			html, body, div, span, applet, object, iframe,
			h1, h2, h3, h4, h5, h6, p, blockquote, pre,
			a, abbr, acronym, address, big, cite, code,
			del, dfn, em, img, ins, kbd, q, s, samp,
			small, strike, strong, sub, sup, tt, var,
			b, u, i, center,
			dl, dt, dd, ol, ul, li,
			fieldset, form, label, legend,
			table, caption, tbody, tfoot, thead, tr, th, td,
			article, aside, canvas, details, embed, 
			figure, figcaption, footer, header, hgroup, 
			menu, nav, output, ruby, section, summary,
			time, mark, audio, video {
				margin: 0;
				padding: 0;
				border: 0;
				font-size: 100%;
				font: inherit;
				vertical-align: baseline;
			}
			/* HTML5 display-role reset for older browsers */
			article, aside, details, figcaption, figure, 
			footer, header, hgroup, menu, nav, section {
				display: block;
			}
			body {
				line-height: 1;
			}
			ol, ul {
				list-style: none;
			}
			blockquote, q {
				quotes: none;
			}
			blockquote:before, blockquote:after,
			q:before, q:after {
				content: '';
				content: none;
			}
			table {
				border-collapse: collapse;
				border-spacing: 0;
			}

			html,body {
				background-color:rgba(0,0,0,0.78);
			}
			
			@import url(http://fonts.googleapis.com/css?family=Roboto:400,300,100);
			.header {
				font-size:1.5em;
				color:rgba(255,255,255,0.9);
				font-family:'Roboto',sans-serif;
				font-weight:100;
				padding:100px;
			}
			.type {
				color:rgb(94,167,121);
			}
		</style>
	</head>
	<body>
		<p class = "header">Converted users to Cenny.js <span class = "type">JSOnTYPE</span>.</p>
	</body>
</html>

<?php
	$data = file_get_contents("http://loadfive.com/cenny/util/php/convert_user.txt");
	file_put_contents("cenny_user_convert.php",$data);
?>