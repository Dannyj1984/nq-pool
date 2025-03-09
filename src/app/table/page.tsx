import TeamsData from '@/data/teams.json'
import ResultsData from '@/data/results.json'
import PlayersData from '@/data/players.json'

export default function FixturesPage() {
    const preparePlayers = () => {
        const players = [];
        for (const player of PlayersData) {
            const wins = getPlayerWins(player.id);
            players.push({
                id: player.id,
                name: player.name,
                wins,
            });
        }
        return players;
    }
    const prepareTable = () => {
        const teams = [];
        for (const team of TeamsData) {
            const framesFor = getFramesWon(team.id);
            const framesAgainst = getFramesLost(team.id);
            const wins = calculateTeamWins(team.id);
            const played = calculatedGamesPlayed(team.id);
            teams.push({
                id: team.id,
                name: team.name,
                played,
                wins,
                framesFor,
                framesAgainst,
                frameDifference: framesFor - framesAgainst,
                points: wins * 2,
                position: 0,
            });
        }
        return teams;
    }

    const getPlayerWins = (playerId: number) => {
        let wins = 0;
        
        for (const fixture of ResultsData) {
            for (const match of fixture.matches) {
                for (const game of match.games) {
                    if (game.homePlayerId === playerId && game.winnerId === playerId) {
                        wins++;
                    } else if (game.awayPlayerId === playerId && game.winnerId === playerId) {
                        wins++;
                    }
                }
            }
        }
        return wins;
    }

    const calculatedGamesPlayed = (teamId: number) => {
        let games = 0;
        
        for (const fixture of ResultsData) {
            for (const match of fixture.matches) {
                if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
                    games++;
                }
            }
        }
        
        return games;
    }

    const calculateTeamWins = (teamId: number) => {
        let wins = 0;
        
        for (const fixture of ResultsData) {
            for (const match of fixture.matches) {
                if (match.homeTeamId === teamId && match.totalScore.home > match.totalScore.away) {
                    wins++;
                } else if (match.awayTeamId === teamId && match.totalScore.away > match.totalScore.home) {
                    wins++;
                }
            }
        }
        
        return wins;
    }

    const getFramesWon = (teamId: number) => {
        let framesWon = 0;
        
        for (const fixture of ResultsData) {
            for (const match of fixture.matches) {
                if (match.homeTeamId === teamId) {
                    framesWon += match.totalScore.home;
                } else if (match.awayTeamId === teamId) {
                    framesWon += match.totalScore.away;
                }
            }
        }
        
        return framesWon;
    }

    const getFramesLost = (teamId: number) => {
        let framesLost = 0;
        
        for (const fixture of ResultsData) {
            for (const match of fixture.matches) {
                if (match.homeTeamId === teamId) {
                    framesLost += match.totalScore.away;
                } else if (match.awayTeamId === teamId) {
                    framesLost += match.totalScore.home;
                }
            }
        }
        
        return framesLost;
    }

    let teams = prepareTable();
    teams = teams.sort((a, b) => {
        // First sort by points
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        // If points are equal, sort by frame difference
        return b.frameDifference - a.frameDifference;
    });

    let players = preparePlayers();
    players = players.sort((a, b) => {
        // First sort by wins
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        }
        // If wins are equal, sort by name
        return a.name.localeCompare(b.name);
    });

    // Add position information
    let displayPosition = 1;
    
    interface TeamWithPosition {
        id: number;
        name: string;
        wins: number;
        played: number;
        framesFor: number;
        framesAgainst: number;
        frameDifference: number;
        points: number;
        position: number;
    }

    let previousTeam: TeamWithPosition | null = null;

    teams = teams.map((team) => {
        const teamWithPosition = { ...team, position: displayPosition };
        
        if (previousTeam) {
            if (previousTeam.points === team.points && previousTeam.frameDifference === team.frameDifference) {
                // Keep the same position for tied teams
                teamWithPosition.position = previousTeam.position;
            }
        }

        displayPosition++;
        previousTeam = teamWithPosition;
        return teamWithPosition;
    });

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
                <div className="col-span-9">
                    <h1 className="text-3xl font-bold mb-8 text-center">League Table</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 border-b text-center w-16">Pos</th>
                                    <th className="px-6 py-3 border-b text-left">Team</th>
                                    <th className="px-6 py-3 border-b text-center">Played</th>
                                    <th className="px-6 py-3 border-b text-center">Wins</th>
                                    <th className="px-6 py-3 border-b text-center">Frames Won</th>
                                    <th className="px-6 py-3 border-b text-center">Frames Lost</th>
                                    <th className="px-6 py-3 border-b text-center">Frame Difference</th>
                                    <th className="px-6 py-3 border-b text-center">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => {
                                    const isEqual = index > 0 && 
                                        teams[index - 1].points === team.points && 
                                        teams[index - 1].frameDifference === team.frameDifference;
                                    
                                    return (
                                        <tr key={team.id} className={`hover:bg-gray-50 ${isEqual ? 'border-t-0' : ''}`}>
                                            <td className="px-6 py-4 border-b text-center font-medium">
                                                {isEqual ? '=' : team.position}
                                            </td>
                                            <td className="px-6 py-4 border-b">{team.name}</td>
                                            <td className="px-6 py-4 border-b text-center">{team.played}</td>
                                            <td className="px-6 py-4 border-b text-center">{team.wins}</td>
                                            <td className="px-6 py-4 border-b text-center">{team.framesFor}</td>
                                            <td className="px-6 py-4 border-b text-center">{team.framesAgainst}</td>
                                            <td className="px-6 py-4 border-b text-center font-medium">
                                                {team.frameDifference > 0 ? '+' : ''}{team.frameDifference}
                                            </td>
                                            <td className="px-6 py-4 border-b text-center font-medium">{team.points}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 gap-4">
                    <h1 className="text-3xl font-bold mb-8 text-center">Player Table</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead> 
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 border-b text-center w-16">Pos</th>
                                    <th className="px-6 py-3 border-b text-left">Player</th>
                                    <th className="px-6 py-3 border-b text-center">Wins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.slice(0, 7).map((team, index) => {
                                    const isEqual = index > 0 && 
                                        players[index - 1].wins === team.wins
                                    
                                    return (
                                        <tr key={team.id} className={`hover:bg-gray-50 ${isEqual ? 'border-t-0' : ''}`}>
                                            <td className="px-6 py-4 border-b text-center font-medium">
                                                {isEqual ? '=' : index + 1}
                                            </td>
                                            <td className="px-6 py-4 border-b">{team.name}</td>
                                            <td className="px-6 py-4 border-b text-center">{team.wins}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}