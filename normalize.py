from collections import namedtuple
import os
import ffmpeg # pip install ffmpeg-python

Voice = namedtuple('Voice', 'name codec duration sample_rate bit_rate')

voices = []
for name in os.listdir('public/voices'):
    if not name.endswith(('.mp3', '.wav')):
        continue
    info = ffmpeg.probe(f'public/voices/{name}')
    if 'streams' not in info or not len(info['streams']):
        print(f'{name}: unknown probe result:')
        print(info)
        continue
    stream = info['streams'][0]
    if stream['codec_type'] != 'audio':
        print(f'{name} first stream not audio')
        print(info)
        continue
    codec = stream['codec_name']
    duration = float(stream['duration'])
    sample_rate = int(stream['sample_rate']) / 1000
    bit_rate = int(stream['bit_rate']) / 1000
    voices.append(Voice(name, codec, duration, sample_rate, bit_rate))
    if name.endswith('.mp3') and codec != 'mp3':
        print(info)

for voice in sorted(voices, key=lambda x: x.bit_rate):
    print(f'[{voice.name}] {voice.codec}, {voice.duration:.2f}s, {voice.sample_rate}kHz, {voice.bit_rate}kbps')

# TODO: https://stackoverflow.com/questions/3255674/convert-audio-files-to-mp3-using-ffmpeg
