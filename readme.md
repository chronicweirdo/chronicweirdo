# Chronicweirdo

## Convert video sizes with ffmpeg

```
ffmpeg -i input_video_name.mp4 -vf scale=-1:720 output_video_name.mp4
```

- `-1:720` means that we scale height to be 720 px and the width gets scaled proportionally

## Delete git history

How to delete the git history to keep the repository size down. Maybe make a local backup of it.

- `git checkout --orphan latest_branch`
- add all the files: `git add -A`
- commit the changes: `git commit -am "commit message"`
- delete the branch: `git branch -D master`
- rename the current branch to master: `git branch -m master`
- finally, force update your repository: `git push -f origin master`
