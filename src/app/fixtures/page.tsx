import fixturesData from '@/data/fixtures.json'
import FixtureTable from '../components/FixtureTable'

export default function FixturesPage() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Fixtures Schedule</h1>
      <div className="space-y-8">
        {fixturesData.map((fixture) => (
          <FixtureTable key={fixture.week} fixture={fixture} />
        ))}
      </div>
    </div>
  )
}