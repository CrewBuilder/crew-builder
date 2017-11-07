var user_crew = [ ];

for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 15; j++) {
    user_crew.push({
      user_id: i + 1,
      crew_id: j + 1,
      points: 0,
      achievement: 'none',
      role: i + 1 === j + 1 ? 'leader' : 'member'
    });
  }
}
module.exports = user_crew;