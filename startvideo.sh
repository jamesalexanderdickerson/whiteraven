#! /bin/sh
#
# startvideo.sh

/Applications/VLC.app/Contents/MacOS/VLC qtcapture:// --sout='#duplicate{dst=display,dst="transcode{vcodec=theo,vb=256,acodec=vorb,ab=64,vfilter=canvas{width=500,height=400,canvas-aspect=4:3}}:standard{mux=ogg,dst=source:ThroughFire1@162.243.78.63:8000/stream.webm,access=shout}"}'


