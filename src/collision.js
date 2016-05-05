function circle_check(pos1, rad1, pos2, rad2)
{
    diff = [Math.abs(pos1[0] - pos2[0]), Math.abs(pos1[1] - pos2[1])];
    return (Math.pow(diff[0], 2) + Math.pow(diff[1], 2) <= Math.pow(rad1 + rad2, 2));
}
