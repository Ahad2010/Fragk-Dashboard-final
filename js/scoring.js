const PLACEMENT_POINTS = { 1: 10, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1, 10: 1 };

function getPlacementPoints(placement) {
  if (placement === null || placement === undefined) return 0;
  return PLACEMENT_POINTS[placement] ?? 0;
}

function getTotalPoints(placement, totalKills) {
  return getPlacementPoints(placement) + totalKills;
}
