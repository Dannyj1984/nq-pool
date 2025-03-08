'use client'
import teamsData from '@/data/teams.json'
import resultsData from '@/data/results.json'
import { useState } from 'react'
import ResultsModal from './resultsModal'

interface Team {
  team: number;
  table?: string;
}

interface Fixture {
  week: number;
  date: string;
  HomeTeams: Team[];
  AwayTeams: Team[];
}

interface FixtureTableProps {
  fixture: Fixture;
}

const getTeamName = (teamId: number) => {
  if (teamId === 0) {
    return 'Bye';
  }
  return teamsData.find(team => team.id === teamId)?.name || `Team ${teamId}`;
}

export default function FixtureTable({ fixture }: FixtureTableProps) {
  const [showResultsModal, setShowResultsModal] = useState(-1);
  const fixtureResult = resultsData.find(result => result.fixtureWeek === fixture.week);

  return (
    <>
      <div className="overflow-x-auto mb-8">
        <h2 className="text-xl font-semibold mb-3">Week {fixture.week} - {new Date(fixture.date).toLocaleDateString()}</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Home Team</th>
              <th className="px-6 py-3 border-b text-left">Table</th>
              <th className="px-6 py-3 border-b text-left">Away Team</th>
              <th className="px-6 py-3 border-b text-center">Score</th>
              <th className="px-6 py-3 border-b text-center w-24">Details</th>
            </tr>
          </thead>
          <tbody>
            {fixture.HomeTeams.map((homeTeam, index) => {
              const matchResult = fixtureResult?.matches[index];
              return (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-50 ${matchResult ? 'cursor-pointer' : ''}`}
                  onClick={() => matchResult && setShowResultsModal(index)}
                >
                  <td className="px-6 py-4 border-b">{getTeamName(homeTeam.team)}</td>
                  <td className="px-6 py-4 border-b">{homeTeam.table || '-'}</td>
                  <td className="px-6 py-4 border-b">{getTeamName(fixture.AwayTeams[index].team)}</td>
                  <td className="px-6 py-4 border-b text-center">
                    {matchResult ? (
                      <span className="font-medium">
                        {matchResult.totalScore.home} - {matchResult.totalScore.away}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {matchResult ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        View Games
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ResultsModal 
        showResultsModal={showResultsModal}
        setShowResultsModal={setShowResultsModal}
        fixture={fixture}
      />
    </>
  );
}