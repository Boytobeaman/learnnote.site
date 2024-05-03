---
title: "ffmpeg"
metaTitle: "ffmpeg"
metaDescription: "ffmpeg相关接口"
---



### Add Watermarks to Videos Using FFmpeg
```

Adjust the Position of the Watermark
The position of the watermark can be adjusted by specifying the (x, y) coordinates of the overlaid image on the input video.


overlay=x:y


Besides using numerical values for the coordinates, you can also use the width and height variables of the main and overlay inputs to adjust the position:


main_w - Main input’s width (video)
main_h - Main input’s height
overlay_w - Overlay input’s width (watermark)
overlay_h - Overlay input’s height

overlay=main_w:main_h

You can also write them in the shortened form—W, H, w, h.

overlay=W:H

```

### Top Left 把水印放左上角
```
overlay=0:0


ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=0:0" top_left.mp4
```


### Center 把水印放中间
```
overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2


ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" output_center.mp4
```

### Top Right 把水印放右上角
```
overlay=(main_w-overlay_w):0

ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=(main_w-overlay_w):0" output_top_right.mp4
```

### Bottom Left 把水印放左下角
```
overlay=0:(main_h-overlay_h)

ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=0:(main_h-overlay_h)" output_bottom_left.mp4
```

### Bottom Right 把水印放右下角
```
overlay=(main_w-overlay_w):(main_h-overlay_h)

ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=(main_w-overlay_w):(main_h-overlay_h)" output_bottom_right.mp4
```

### Adjust the Transparency of the Watermark
```
You can adjust the transparency of the image using this option:

format=rgba,colorchannelmixer=aa=0.3
//aa=0.3 specifies the opacity of the image

ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1]format=rgba,colorchannelmixer=aa=0.3[logo];[0][logo]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" output_center_cover_transparent.mp4
```