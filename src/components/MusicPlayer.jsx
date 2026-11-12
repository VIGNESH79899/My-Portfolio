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

      {/* Floating Bottom Left Audio Controller Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-5 left-5 z-40 font-sans max-w-[calc(100vw-24px)]"
      >
        <button
          ref={buttonRef}
          onClick={() => { try { playClickSound(); } catch (e) {} setIsOpen(!isOpen); }}
          className="btn-venom group inline-flex items-center gap-2.5 !py-2 !px-4 shadow-2xl cursor-pointer"
        >
          {/* Animated Equalizer Waves */}
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <span className="w-0.5 h-3 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="w-0.5 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-[pulse_1.4s_ease-in-out_infinite_delay-150] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="w-0.5 h-2.5 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_delay-300] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          </div>

          <div className="text-left hidden sm:flex items-center gap-1.5 font-mono text-[11px]">
            <span className="text-[#ADB293] font-bold">#{currentTrackIndex + 1}</span>
            <span className="text-white font-semibold max-w-[130px] truncate font-sans text-xs">
              {currentTrack.title}
            </span>
          </div>
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
            className="fixed bottom-16 sm:bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] max-w-[410px] bg-[#1C1D19] text-[#F5F2EB] rounded-3xl border border-[#414239] shadow-2xl p-4 sm:p-6 overflow-hidden font-sans max-h-[82vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#414239]">
              <div className="flex items-center gap-2 text-[#ADB293] font-bold text-xs font-mono">
                <FaMusic className="text-base" /> Adhi's Favorite Playlist Jukebox
              </div>

              <button
                onClick={() => { try { playClickSound(); } catch (e) {} setIsOpen(false); }}
                className="p-1.5 rounded-full hover:bg-[#252620] text-[#C0BFB3] hover:text-[#F5F2EB] transition-colors cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Current track */}
            <div className="p-4 rounded-2xl bg-[#252620] border border-[#414239] mb-4 shadow-md">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-[#ADB293] font-mono font-bold uppercase tracking-wider block">
                    OFFICIAL TRACK #{currentTrackIndex + 1} OF {playlist.length}
                  </span>
                  <h4 className="text-sm font-bold font-display text-[#F5F2EB] truncate">{currentTrack.title}</h4>
                  <p className="text-xs text-[#C0BFB3] truncate">{currentTrack.artist}</p>
                </div>
                <span className="text-[10px] font-mono text-[#C0BFB3] shrink-0">{currentTrack.duration}</span>
              </div>

              {/* Spotify Official Stream Player */}
              {getSpotifyEmbedUrl(currentTrack) ? (
                <iframe
                  key={currentTrack.id}
                  title={`${currentTrack.title} by ${currentTrack.artist} on Spotify`}
                  src={getSpotifyEmbedUrl(currentTrack)}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl mb-3 shadow-md"
                />
              ) : isLocalTrackAvailable === true ? (
                <audio
                  key={currentTrack.id}
                  controls
                  preload="metadata"
                  onError={() => setIsLocalTrackAvailable(false)}
                  className="mb-3 h-10 w-full accent-[#777C62]"
                >
                  <source src={getLocalAudioUrl(currentTrack)} type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
              ) : (
                <a
                  href={getSpotifyUrl(currentTrack)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-3 flex items-center justify-between rounded-xl border border-[#414239] bg-[#1C1D19] px-3 py-3 text-xs text-[#C0BFB3] hover:border-[#ADB293] hover:text-[#F5F2EB] transition-colors"
                >
                  Listen to the official track on Spotify
                  <FaExternalLinkAlt className="text-[#ADB293]" />
                </a>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-[#303129] text-[#C0BFB3] hover:text-[#F5F2EB] transition-all cursor-pointer"
                  title="Previous track"
                >
                  <FaStepBackward size={14} />
                </button>
                <span className="text-[10px] font-mono text-[#C0BFB3] font-semibold">
                  Official Spotify Stream
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full hover:bg-[#303129] text-[#C0BFB3] hover:text-[#F5F2EB] transition-all cursor-pointer"
                    title="Next track"
                  >
                    <FaStepForward size={14} />
                  </button>
                  <a
                    href={getSpotifyUrl(currentTrack)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#303129] hover:bg-[#36372E] text-[#ADB293] transition-all text-xs"
                    title="Open on Spotify"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

            </div>

            <div className="p-3 rounded-xl bg-[#252620] border border-[#414239] mb-3 text-[10px] font-mono text-[#C0BFB3] flex items-center justify-between">
              <span>{isLocalTrackAvailable ? 'Full local audio ready.' : 'Spotify preview active.'}</span>
              <span className="text-[#ADB293] font-bold">15 tracks</span>
            </div>

            {/* Playlist Search Filter */}
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#68675F] text-xs" />
              <input
                type="text"
                placeholder="Search Adhi's 15 favorite songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#252620] border border-[#414239] text-xs text-[#F5F2EB] placeholder-[#68675F] focus:outline-hidden focus:border-[#ADB293] font-mono"
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
                        ? "bg-[#303129] border border-[#777C62] text-[#F5F2EB] font-bold"
                        : "hover:bg-[#252620] text-[#C0BFB3]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono font-bold text-[#68675F] w-6 text-right shrink-0">
                        #{trackNumber}
                      </span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#414239] bg-[#1C1D19] text-[#ADB293]">
                        <FaMusic className="text-xs" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-[#F5F2EB] line-clamp-1">{song.title}</h5>
                        <p className="text-[10px] text-[#C0BFB3] line-clamp-1">{song.artist}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#68675F] shrink-0 ml-2">{song.duration}</span>
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
