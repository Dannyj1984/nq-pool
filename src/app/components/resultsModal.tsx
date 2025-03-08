'use client'

import resultsData from '@/data/results.json'
import playersData from '@/data/players.json'
import teamsData from '@/data/teams.json'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface ResultsModalProps {
  showResultsModal: number;
  setShowResultsModal: (value: number) => void;
  fixture: {
    week: number;
    HomeTeams: { team: number }[];
    AwayTeams: { team: number }[];
  };
}

const getPlayerName = (playerId: number) => {
  return playersData.find(player => player.id === playerId)?.name || `Player ${playerId}`;
}

const getTeamName = (teamId: number) => {
  if (teamId === 0) {
    return 'Bye';
  }
  return teamsData.find(team => team.id === teamId)?.name || `Team ${teamId}`;
}

export default function ResultsModal({ showResultsModal, setShowResultsModal, fixture }: ResultsModalProps) {
  const fixtureResult = resultsData.find(result => result.fixtureWeek === fixture.week);
  const match = fixtureResult?.matches[showResultsModal];
  const homeTeamId = fixture.HomeTeams[showResultsModal]?.team;
  const awayTeamId = fixture.AwayTeams[showResultsModal]?.team;

  return (
    <Transition appear show={showResultsModal > -1} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShowResultsModal(-1)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-2"
                >
                  {getTeamName(homeTeamId)} vs {getTeamName(awayTeamId)}
                </Dialog.Title>
                <div className="text-sm text-gray-500 mb-4">
                  Week {fixture.week} Results
                </div>

                {match ? (
                  <div>
                    <div className="mb-6 text-center bg-gray-50 py-4 rounded-lg">
                      <div className="grid grid-cols-3 items-center">
                        <div className={`text-lg ${match.totalScore.home > match.totalScore.away ? 'font-bold text-green-600' : ''}`}>
                          {getTeamName(homeTeamId)}
                        </div>
                        <div className="text-2xl font-bold">
                          {match.totalScore.home} - {match.totalScore.away}
                        </div>
                        <div className={`text-lg ${match.totalScore.away > match.totalScore.home ? 'font-bold text-green-600' : ''}`}>
                          {getTeamName(awayTeamId)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700 mb-2">Individual Games</h4>
                      {match.games.map((game, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-gray-50">
                          <div className="grid grid-cols-3 gap-2 text-sm items-center">
                            <div className={`text-left ${game.winnerId === game.homePlayerId ? 'font-bold text-green-600' : ''}`}>
                              {getPlayerName(game.homePlayerId)}
                            </div>
                            <div className="text-center text-xs text-gray-500 font-medium">
                              Game {index + 1}
                            </div>
                            <div className={`text-right ${game.winnerId === game.awayPlayerId ? 'font-bold text-green-600' : ''}`}>
                              {getPlayerName(game.awayPlayerId)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">No results available for this match</div>
                )}

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setShowResultsModal(-1)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}