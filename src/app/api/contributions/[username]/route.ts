import { NextRequest, NextResponse } from 'next/server';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch contributions from GitHub' },
        { status: response.status },
      );
    }

    const html = await response.text();

    // Extract total contributions
    const totalMatch = html.match(
      /([0-9,]+)\s+contributions\s+in the last year/,
    );
    const totalCount = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ''), 10)
      : 0;

    // Parse tooltips for exact contribution counts
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>(.*?)<\/tool-tip>/g;
    const tooltipMap = new Map<string, number>();
    let tooltipMatch;
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      const id = tooltipMatch[1];
      const text = tooltipMatch[2];
      const countMatch = text.match(/([0-9,]+)\s+contribution/);
      const count = countMatch
        ? parseInt(countMatch[1].replace(/,/g, ''), 10)
        : 0;
      tooltipMap.set(id, count);
    }

    // Parse contribution calendar days
    const tdRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    const contributions: ContributionDay[] = [];
    let tdMatch;

    while ((tdMatch = tdRegex.exec(html)) !== null) {
      const tdTag = tdMatch[0];
      const dateMatch = tdTag.match(/data-date="([^"]+)"/);
      const levelMatch = tdTag.match(/data-level="([^"]+)"/);
      const idMatch = tdTag.match(/id="([^"]+)"/);

      if (dateMatch && levelMatch) {
        const date = dateMatch[1];
        const level = Math.min(
          Math.max(parseInt(levelMatch[1], 10) || 0, 0),
          4,
        ) as 0 | 1 | 2 | 3 | 4;
        const id = idMatch ? idMatch[1] : '';
        const count = tooltipMap.get(id) ?? (level > 0 ? 1 : 0);

        contributions.push({
          date,
          count,
          level,
        });
      }
    }

    return NextResponse.json({
      total: {
        lastYear: totalCount,
      },
      contributions,
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching contributions' },
      { status: 500 },
    );
  }
}
