import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStepForward, FaStepBackward, FaMusic, FaTimes, FaSearch, FaExternalLinkAlt
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

// Full playback uses licensed local files. Spotify provides an official fallback when a file is unavailable.
const playlist = [
  { 
    id: 1, 
    title: "Runaway", 
    artist: "AURORA", 
    duration: "4:08", 
    album: "All My Demons Greeting Me as a Friend",
    audioFile: "runaway.mp3",
    spotifyUrl: "https://open.spotify.com/search/Runaway%20AURORA"
  },
  { 
    id: 2, 
    title: "I'm God", 
    artist: "Clams Casino, Imogen Heap", 
    duration: "4:37", 
    album: "I'm God",
    audioFile: "im-god.mp3",
    spotifyUrl: "https://open.spotify.com/search/Im%20God%20Clams%20Casino"
  },
  { 
    id: 3, 
    title: "Cinnamon Girl", 
    artist: "Lana Del Rey", 
    duration: "5:00", 
    album: "Norman Fucking Rockwell!",
    audioFile: "cinnamon-girl.mp3",
    spotifyUrl: "https://open.spotify.com/search/Cinnamon%20Girl%20Lana%20Del%20Rey"
  },
  { 
    id: 4, 
    title: "White Mustang", 
    artist: "Lana Del Rey", 
    duration: "2:44", 
    album: "Lust For Life",
    audioFile: "white-mustang.mp3",
    spotifyUrl: "https://open.spotify.com/search/White%20Mustang%20Lana%20Del%20Rey"
  },
  { 
    id: 5, 
    title: "Aarzu", 
    artist: "Noor, Khan, Madhurxo", 
    duration: "3:07", 
    album: "Aarzu",
    audioFile: "aarzu.mp3",
    spotifyUrl: "https://open.spotify.com/search/Aarzu%20Noor%20Khan"
  },
  { 
    id: 6, 
    title: "Khat", 
    artist: "Navjot Ahuja", 
    duration: "4:56", 
    album: "Khat",
    audioFile: "khat.mp3",
    spotifyUrl: "https://open.spotify.com/search/Khat%20Navjot%20Ahuja"
  },
  { 
    id: 7, 
    title: "I Wanna Be Yours", 
    artist: "Arctic Monkeys", 
    duration: "3:04", 
    album: "AM",
    audioFile: "i-wanna-be-yours.mp3",
    spotifyUrl: "https://open.spotify.com/search/I%20Wanna%20Be%20Yours%20Arctic%20Monkeys"
  },
  { 
    id: 8, 
    title: "Safar", 
    artist: "Bayaan, Sherazam", 
    duration: "3:36", 
    album: "Safar",
    audioFile: "safar.mp3",
    spotifyUrl: "https://open.spotify.com/search/Safar%20Bayaan"
  },
  { 
    id: 9, 
    title: "FE!N (feat. Playboi Carti)", 
    artist: "Travis Scott, Playboi Carti", 
    duration: "3:12", 
    album: "UTOPIA",
    audioFile: "fein.mp3",
    spotifyUrl: "https://open.spotify.com/search/FEIN%20Travis%20Scott"
  },
  { 
    id: 10, 
    title: "Guzarish", 
    artist: "A.R. Rahman, Javed Ali, Prasoon Joshi", 
    duration: "5:27", 
    album: "Ghajini",
    audioFile: "guzarish.mp3",
    spotifyUrl: "https://open.spotify.com/search/Guzarish%20AR%20Rahman"
  },
  { 
    id: 11, 
    title: "Kabira", 
    artist: "Pritam, Tochi Raina, Rekha Bhardwaj, Amitabh Bhattacharya", 
    duration: "3:43", 
    album: "Yeh Jawaani Hai Deewani",
    audioFile: "kabira.mp3",
    spotifyUrl: "https://open.spotify.com/search/Kabira%20Pritam"
  },
  { 
    id: 12, 
    title: "Ehsaas", 
    artist: "Faheem Abdullah, Duha Shah, Vaibhav Pani, Hyder Dar", 
    duration: "3:53", 
    album: "Ehsaas",
    audioFile: "ehsaas.mp3",
    spotifyUrl: "https://open.spotify.com/search/Ehsaas%20Faheem%20Abdullah"
  },
  { 
    id: 13, 
    title: "Finding Her", 
    artist: "Kushagra, Bharath, Saaheal", 
    duration: "3:27", 
    album: "Finding Her",
    audioFile: "finding-her.mp3",
    spotifyUrl: "https://open.spotify.com/search/Finding%20Her%20Kushagra"
  },
  { 
    id: 14, 
    title: "Paro", 
    artist: "Aditya Rikhari, UNPLG'd", 
    duration: "1:10", 
    album: "Paro",
    audioFile: "paro.mp3",
    spotifyUrl: "https://open.spotify.com/search/Paro%20Aditya%20Rikhari"
  },
  { 
    id: 15, 
    title: "Despacito - Remix", 
    artist: "Luis Fonsi, Daddy Yankee, Justin Bieber", 
    duration: "3:50", 
    album: "VIDA",
    audioFile: "despacito.mp3",
    spotifyUrl: "https://open.spotify.com/search/Despacito%20Luis%20Fonsi"
  }
];

const spotifyTrackIds = {
  1: '2GMVFDUyBScHFjYlajlF0A',
  2: '0FVuyC9RP5MACjp4lgU3qZ',
  3: '1rRF6fK363x2kiCuCmhLMX',
  4: '6eygbzyL6hY8jFQTARDuo9',
  5: '429S6EpLnnZooZZLm3LEyN',
  6: '3gixnmepHSsyAuho34rprN',
  7: '5XeFesFbtLpXzIVDNQP22n',
  9: '42VsgItocQwOQC3XWZ8JNA',
  10: '2MvCNH9ua0CeOgUQfZf56z',
  11: '4bD9z9qa4qg9BhryvYWB7c',
  12: '5PetOhEX9N0oyBB0Keqobv',
  13: '5ThyDv6aRVU8AH4vXQNldF',
  14: '4tJmlRRskUH4wNuRbo0g5o',
  15: '1vnnXMrBeEWiRg3YCMCjQq',
};

const spotifyEmbedOverrides = {
  8: 'https://open.spotify.com/embed/album/3M8j6IwEcqDnf0V3y3ZI3C?utm_source=generator&theme=0',
};

const getSpotifyUrl = (track) => {
  const trackId = spotifyTrackIds[track.id];
  return trackId ? `https://open.spotify.com/track/${trackId}` : track.spotifyUrl;
};

const getSpotifyEmbedUrl = (track) => {
  if (spotifyEmbedOverrides[track.id]) return spotifyEmbedOverrides[track.id];
  const trackId = spotifyTrackIds[track.id];
  return trackId ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0` : null;
};

const getLocalAudioUrl = (track) => `/music/${track.audioFile}`;

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocalTrackAvailable, setIsLocalTrackAvailable] = useState(null);

  const playerRef = useRef(null);
  const buttonRef = useRef(null);
  const currentTrack = playlist[currentTrackIndex];

  // Click-Outside & Escape Key Listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        playerRef.current && 
        !playerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    let isCurrentTrack = true;
    setIsLocalTrackAvailable(null);

    fetch(getLocalAudioUrl(currentTrack), { method: 'HEAD' })
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        if (isCurrentTrack) {
          setIsLocalTrackAvailable(response.ok && contentType.startsWith('audio/'));
        }
      })
      .catch(() => {
        if (isCurrentTrack) setIsLocalTrackAvailable(false);
      });

    return () => {
      isCurrentTrack = false;
    };
  }, [currentTrackIndex]);

  const handleNext = () => {
    try { playClickSound(); } catch (e) {}
    setCurrentTrackIndex((currentIndex) => (currentIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    try { playClickSound(); } catch (e) {}
    setCurrentTrackIndex((currentIndex) => (currentIndex - 1 + playlist.length) % playlist.length);
  };

  const selectTrack = (index) => {
    try { playSuccessSound(); } catch (e) {}
    setCurrentTrackIndex(index);
  };

  const filteredPlaylist = playlist.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Invisible Screen Backdrop Overlay when Jukebox is Open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-45 bg-slate-950/25 backdrop-blur-[1px] cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Left Jukebox Controller Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 font-sans max-w-[calc(100vw-24px)]"
      >
        <button
          ref={buttonRef}
          onClick={() => { try { playClickSound(); } catch (e) {} setIsOpen(!isOpen); }}
          className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-950 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md transition-all group cursor-pointer"
        >
          <span className="p-2 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold animate-pulse">
            <FaMusic />
          </span>

          <div className="text-left hidden sm:block">
            <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
              Adhi's Favorite Songs Jukebox
            </span>
            <span className="text-xs font-bold text-slate-100 max-w-[140px] truncate block font-sans">
              #{currentTrackIndex + 1} {currentTrack.title}
            </span>
          </div>

          <FaMusic className="text-xs text-slate-400 group-hover:text-emerald-400 transition-colors" />
        </button>
      </motion.div>

      {/* Floating Jukebox Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={playerRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-16 sm:bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] max-w-[410px] bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 overflow-hidden backdrop-blur-xl font-sans max-h-[82vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                <FaMusic className="text-base" /> Adhi's Favorite Playlist Jukebox
              </div>

              <button
                onClick={() => { try { playClickSound(); } catch (e) {} setIsOpen(false); }}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Current track */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 mb-4 shadow-lg">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                    OFFICIAL TRACK #{currentTrackIndex + 1} OF {playlist.length}
                  </span>
                  <h4 className="text-sm font-extrabold text-white truncate">{currentTrack.title}</h4>
                  <p className="text-xs text-slate-400 truncate">{currentTrack.artist}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{currentTrack.duration}</span>
              </div>

              {isLocalTrackAvailable === true ? (
                <audio
                  key={currentTrack.id}
                  controls
                  preload="metadata"
                  onError={() => setIsLocalTrackAvailable(false)}
                  className="mb-3 h-10 w-full accent-emerald-500"
                >
                  <source src={getLocalAudioUrl(currentTrack)} type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
              ) : isLocalTrackAvailable === null ? (
                <div className="mb-3 h-20 animate-pulse rounded-xl border border-slate-800 bg-slate-900" />
              ) : getSpotifyEmbedUrl(currentTrack) ? (
                <iframe
                  title={`${currentTrack.title} by ${currentTrack.artist} on Spotify`}
                  src={getSpotifyEmbedUrl(currentTrack)}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl mb-3"
                />
              ) : (
                <a
                  href={getSpotifyUrl(currentTrack)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-xs text-slate-300 hover:border-emerald-500 hover:text-white transition-colors"
                >
                  Listen to the official track on Spotify
                  <FaExternalLinkAlt className="text-emerald-400" />
                </a>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Previous track"
                >
                  <FaStepBackward size={14} />
                </button>
                <span className="text-[10px] font-mono text-slate-500">
                  {isLocalTrackAvailable ? 'Full local playback' : 'Spotify preview'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                    title="Next track"
                  >
                    <FaStepForward size={14} />
                  </button>
                  <a
                    href={getSpotifyUrl(currentTrack)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-all text-xs"
                    title="Open on Spotify"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>{isLocalTrackAvailable ? 'Full local audio ready.' : 'Spotify preview active.'}</span>
              <span className="text-emerald-400 font-bold">15 tracks</span>
            </div>

            {/* Playlist Search Filter */}
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="text"
                placeholder="Search Adhi's 15 favorite songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Song List in Clean Sorted Numerical Order #1, #2, #3 ... #15 */}
            <div className="max-h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredPlaylist.map((song) => {
                const isSelected = song.id === currentTrack.id;
                const trackNumber = playlist.findIndex((p) => p.id === song.id) + 1;

                return (
                  <div
                    key={song.id}
                    onClick={() => selectTrack(playlist.findIndex((p) => p.id === song.id))}
                    className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-emerald-950/80 border border-emerald-800 text-white font-bold"
                        : "hover:bg-slate-900/80 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-slate-400 w-6 text-right shrink-0">
                        #{trackNumber}
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-800 bg-slate-950 text-emerald-400">
                        <FaMusic className="text-xs" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-200 line-clamp-1">{song.title}</h5>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{song.artist}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">{song.duration}</span>
                  </div>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
