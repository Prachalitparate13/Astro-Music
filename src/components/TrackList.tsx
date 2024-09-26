import type {JSX} from 'preact/jsx-runtime'

import { currentTrack,isPlaying, type Track } from './state'

type Props = {
    tracks: Track[];
    albumId: string;
    albumName: string;
    artist: string;
    imageUrl: string;
  };

  const PlayIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10 sm:w-14 sm:h-14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill-rule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
        clip-rule="evenodd"
      />
    </svg>
  );
  
  const PauseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10 sm:w-14 sm:h-14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill-rule="evenodd"
        d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
        clip-rule="evenodd"
      />
    </svg>
  );

  function renderIcon(icon:JSX.Element,position:number){
    return(
        <span>
            {icon}
            <span className='sr-only'>{position}</span>
        </span>
    )
  }

  export default function TrackList({
    tracks,
    albumId,
    albumName,
    artist,
    imageUrl,
  }: Props) {
    return (
      <ul className="text-xl" aria-label="Tracklist">
        {tracks.map((track, index) => {
          const isCurrentTrack = track.id == currentTrack.value?.id
  
          return (
            <li className="first:border-t border-b">
              <button
                type="button"
                className="hover:bg-gray-50 focus-visible:ring-2 focus:outline-none focus:ring-black cursor-pointer px-6 py-4 flex basis grow w-full items-center"
                aria-current={isCurrentTrack}
                onClick={() => {
                  currentTrack.value = {
                    ...track,
                    albumName,
                    albumId,
                    artist,
                    imageUrl,
                  }
  
                  isPlaying.value == isCurrentTrack ? !isPlaying.value : true
                }}
              >
                <span className="text-orange-500 w mr-2">
                  {isCurrentTrack && isPlaying.value
                    ? renderIcon(PauseIcon, track.position)
                    : isCurrentTrack && !isPlaying.value
                    ? renderIcon(PlayIcon, track.position)
                    : track.position}
                </span>
                <span className="sr-only"> - </span>
                <span className="font-medium">{track.title}</span>
                <span className="sr-only"> - </span>
                <span className="text-gray-500 ml-auto">{track.length}</span>
  
                <span className="sr-only">
                  (press to{' '}
                  {isCurrentTrack && isPlaying.value ? 'pause)' : 'play)'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }