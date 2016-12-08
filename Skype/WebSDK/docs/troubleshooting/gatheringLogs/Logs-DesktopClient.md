# Gathering Logs from a Skype for Business Desktop Client

There are 2 types of logs available from the desktop client: **.UccApilog** files contain general usage information, and **.etl** files contain media-specific log information. For any bugs related to Audio/Video, please attach both log types if possible. For bugs not related to Audio/Video, the **.UccApilog** files should be sufficient.

On a Windows machine, the logs for a Skype for business desktop client will be located in the following directory:

>**%LOCALAPPDATA%\Microsoft\Office\16.0\Lync\Tracing\Lync-UccApi-[[n]].UccApilog** where **[[n]]**
should be replaced by a number 0-2.

On a Mac Machine, the location is _**Coming Soon!**_

After reproducing the issue and closing the client, navigate to this directory and select the log file with the most recent timestamp. This is the file you should submit with any bug report.

