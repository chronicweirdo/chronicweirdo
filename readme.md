# Chronicweirdo

## Convert video sizes with ffmpeg

```
ffmpeg -i input_video_name.mp4 -vf scale=-1:720 output_video_name.mp4
```

- `-1:720` means that we scale height to be 720 px and the width gets scaled proportionally