import cv2
import argparse
import numpy as np
from scipy.misc import imresize


def caps_are_open(caps):
    """Return true if all caps are open"""
    return all([c.isOpened() for c in caps])


def join_frames(frames,verbose=False):
    size = frames[0].shape
    for i,frame in enumerate(frames):
        frames[i] = imresize(frame, size)
        if verbose:
            print(frames[i].shape)
    row1 = np.hstack((frames[0], frames[1]))
    row2 = np.hstack((frames[2], frames[3]))
    return np.vstack((row1, row2))


def join_videos(filenames, output, fps=30):
    codec = "H264"
    fourcc = cv2.VideoWriter_fourcc(*codec)
    writer = None
    speeds = [1,1,0.5,1]
    caps = [VideoReader(i,s) for i,s in zip(filenames,speeds)]
    count = 0
    while caps_are_open(caps):
        results = [cap.read() for cap in caps]
        ret = [result[0] for result in results]
        frames = [result[1] for result in results]

        if not all(ret): break
        frame = join_frames(frames, verbose=count==0)

        if writer is None:
            h,w,_ = frame.shape
            writer = cv2.VideoWriter(output, fourcc, fps, (w,h), True)
        
        writer.write(frame)
        count += 1

        if count%10==0:
            print("Processed %i frames"%count)

    for cap in caps:
        cap.release()
    writer.release()

class VideoReader(cv2.VideoCapture):

    def __init__(self,filename,speed):
        self.read_pointer = 0
        self.frame_pointer = 0
        self.speed = speed
        super().__init__(filename)

    def read(self):
        self.read_pointer += self.speed
        if self.read_pointer > self.frame_pointer:
            self.cache = super().read()
            self.frame_pointer +=1
        return self.cache

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('inputs', metavar='N', nargs='+', help='input video filenames')
    ap.add_argument("-o", "--output", dest="out", help="path to output video file")
    args = vars(ap.parse_args())
    join_videos(args['inputs'], args['out'])

