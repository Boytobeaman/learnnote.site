---
title: "php"
metaTitle: "php 常见问题和命令, php 正则"
metaDescription: "php 常见问题和命令, php 正则， php 入门"
---

### 如何调试 wordpress 网站
#### php 如何将debugg 信息输出到 log file 中？ How to print a debug log? 
If you want to output a debug message to a log file, you can use the error_log function.

```
// Enable WP_DEBUG mode
define( 'WP_DEBUG', true );
 
// Enable Debug logging to the /wp-content/debug.log file
define( 'WP_DEBUG_LOG', true );



// 使用 error_log 可以把想输出的内容放到 /wp-content/debug.log 文件中
// 比如下面输出 SERVER_NAME
// eg: www.xxx.com
$SERVER_NAME = $_SERVER['SERVER_NAME'];
error_log(print_r($SERVER_NAME, TRUE)); 
```

#### str_replace 替换字符串
```
// Replace the characters "world" in the string "world Hello world!" with "Peter":
echo str_replace("world","Peter","world Hello world!");
// Peter Hello Peter!
```


#### preg_quote php正则中使用变量

```
$reg = '/^[a-z"]{1,'. preg_quote($number) .'}$/';
```


### 常用hooks

### 集成 tailwind，
#### 保存post时，提取post里面的class 生成 safelist txt 文件
#### 删除post时，删除对应的 safelist txt 文件
```
function save_safelist_by_content_and_filename( $content, $name ) {
	
	
	$pattern = '/class="(.*?)"/i';
    
    
	error_log(print_r('saveing post related css', TRUE));
    error_log(print_r($name, TRUE)); 
	
	
	
    $myfile = fopen($name, "w") or die("Unable to open file!");
    
    
    if(preg_match_all($pattern, $content, $matches)) {
        $txt = join(" ",$matches[1]);
        $txt = explode(" ",$txt);
        // 除去重复class
        $txt = array_unique($txt);
        $txt = join(" ", $txt);
        
        fwrite($myfile, $txt);
    }
    
    fclose($myfile);
}



function save_relative_class( $post_id ) {
    // If this is a revision, get real post ID.
    $parent_id = wp_is_post_revision( $post_id );
    
    $content = get_post_field('post_content', $post_id);
    
    $folder=get_template_directory().'/safelist-post/';
	
	$fileName='safe-'.$post_id.'.txt';
	$name=$folder.$fileName;
	
	save_safelist_by_content_and_filename($content, $name);
  
}
add_action( 'save_post', 'save_relative_class' );




// delete post
add_action( 'after_delete_post', 'remove_safelist_txt', 10, 2 );

// delete product category
add_action('delete_term', 'remove_safelist_txt', 10, 2);
function remove_safelist_txt( $post_id, $post ) {
    // get the txt file of the safe list
    $folder=get_template_directory().'/safelist-post/';
    $fileName='safe-'.$post_id.'.txt';

    // The unlink() function deletes a file.
    error_log(print_r('remove safelist file after delete post', TRUE)); 
    error_log(print_r($folder.$fileName, TRUE)); 
    unlink($folder.$fileName);
}






function my_custom_function_after_product_category_save($term_id, $tt_id, $taxonomy) {
	

	error_log(print_r($taxonomy, TRUE)); 
	
	
	
    if ($taxonomy === 'product_cat') {
        // Perform custom actions after a product category is saved or updated
        $category = get_term($term_id, 'product_cat');

		if (!is_wp_error($category) && $category instanceof WP_Term) {
			$content = $category->description;
			error_log(print_r($content, TRUE)); 
			
			$folder=get_template_directory().'/safelist-post/';
	
			$fileName='safe-'.$term_id.'.txt';
			$name=$folder.$fileName;

			save_safelist_by_content_and_filename($content, $name);

		}
    }
}
add_action('created_term', 'my_custom_function_after_product_category_save', 10, 3);
add_action('edited_term', 'my_custom_function_after_product_category_save', 10, 3);





/**
 * Enqueue theme assets.
 */
function tailpress_enqueue_scripts() {
	$theme = wp_get_theme();

	wp_enqueue_style( 'tailpress', tailpress_asset( 'css/app.css' ), array(), $theme->get( 'Version' ) );
	// js 在astro 里面没用
	//wp_enqueue_script( 'tailpress', tailpress_asset( 'js/app.js' ), array(), $theme->get( 'Version' ) );
}

add_action( 'wp_enqueue_scripts', 'tailpress_enqueue_scripts' );

/**
 * Get asset path.
 *
 * @param string  $path Path to asset.
 *
 * @return string
 */
function tailpress_asset( $path ) {
	if ( wp_get_environment_type() === 'production' ) {
		return get_stylesheet_directory_uri() . '/' . $path;
	}

	return add_query_arg( 'time', time(),  get_stylesheet_directory_uri() . '/' . $path );
}

```