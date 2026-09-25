import csv,json,glob,sys
from PIL import Image
REPO=r'C:/Users/turko/Documents/GitHub/LTK'
rows=list(csv.DictReader(open('credits.csv',encoding='utf-8')))
caps={}
for f in sorted(glob.glob('captions-*.json')): caps.update(json.load(open(f,encoding='utf-8')))
# Editorial decisions from caption review. 'x' = exclude; otherwise the section to move it to.
DECIDE={
 'termites-wdo/p164-1.jpg':'flies-gnats','termites-wdo/p164-2.jpg':'flies-gnats','termites-wdo/p164-3.jpg':'flies-gnats',
 'termites-wdo/p530-1.jpg':'x','termites-wdo/p530-2.jpg':'stinging-insects','termites-wdo/p534.jpg':'x','termites-wdo/p356-2.jpg':'x',
 'fumigation/p345-1.jpg':'exclusion','fumigation/p345-2.jpg':'x','fumigation/p346.jpg':'x',
 'rodents/p516.jpg':'wildlife','rodents/p502.jpg':'x','rodents/p508.jpg':'x','rodents/p510-2.jpg':'x','rodents/p541-2.jpg':'x',
 'rodents/p556.jpg':'x','rodents/p571.jpg':'x','rodents/t33-8.jpg':'x',
 'wildlife/p504.jpg':'bats-birds','wildlife/p546-2.jpg':'x',
 'bats-birds/p478.jpg':'keep','bats-birds/p479.jpg':'keep','bats-birds/p483.jpg':'x',
 'exclusion/p551-1.jpg':'keep','exclusion/p551-2.jpg':'keep','exclusion/p552-1.jpg':'keep','exclusion/p552-2.jpg':'keep',
 'commercial-monitoring/p264.jpg':'spiders-scorpions',
 'gear/g46.jpg':'rodents',
}
for k in ['p265-1','p265-2','p265-3','p265-4','p265-5','p266-1','p266-2','p266-3']: DECIDE[f'commercial-monitoring/{k}.jpg']='wildlife'

A={'ants/p175.jpg':'spiders-scorpions','stinging-insects/p79.jpg':'occasional-invaders','stinging-insects/p563-1.jpg':'rodents',
 'stinging-insects/p563-2.jpg':'bed-bugs','stinging-insects/p563-3.jpg':'occasional-invaders','stinging-insects/p563-5.jpg':'x',
 'spiders-scorpions/p81.jpg':'occasional-invaders','cockroaches/p7-1.jpg':'bed-bugs','cockroaches/p7-2.jpg':'bed-bugs',
 'ants/p16.jpg':'x','flies-gnats/p249.jpg':'x','mosquito-vector/p375-3.jpg':'sanitation-conducive',
 'cockroaches/p454.jpg':'x','cockroaches/t25.jpg':'x','spiders-scorpions/p119-1.jpg':'x','stinging-insects/p33-1.jpg':'x',
 'bed-bugs/p230.jpg':'x','spiders-scorpions/p15.jpg':'x'}
for k in range(1,5): A[f'ants/p572-{k}.jpg']='termites-wdo'
for k in range(5,9): A[f'ants/p572-{k}.jpg']='x'
DECIDE.update(A)
out=[]; skipped=[]
for r in rows:
    f=r['file']; c=caps.get(f,{}); sec=r['section']
    d=DECIDE.get(f)
    if d=='x' or (d is None and c.get('issue')):
        skipped.append((f,c.get('issue'))); continue
    if d and d!='keep': sec=d
    w,h=Image.open(f"{REPO}/public/photos/community/{f}").size
    out.append({'src':f"/photos/community/{f}",'section':sec,'key':r['key'],
      'alt':c.get('alt') or f"Member photo from the {sec.replace('-',' ')} channel",
      'caption':c.get('caption') or '','id':c.get('id') or '','featured':bool(c.get('featured')),
      'width':w,'height':h,'credit':r['posted_by_discord_user'],'date':r['date'],'note':None})
missing=[r['file'] for r in rows if r['file'] not in caps]
tpl=open('registry_template.ts',encoding='utf-8').read() if False else None
head='''/**
 * community-photos.ts — GENERATED from the LTK Discord photo pack (credits.csv + caption review).
 * Do not hand-edit; regenerate with the build script. Photos are credited by Discord handle; the
 * community approved their use (owner, 2026-09-25). Excluded during review: identifiable people,
 * plates, business names and competitor labels, graphic content, screenshots/stock images,
 * blurry or off-topic shots. Mis-sorted photos were moved to the right section.
 */

export interface CommunityPhoto {
  src: string;
  section: string;
  key: string;
  alt: string;
  caption: string;
  id: string;
  featured: boolean;
  width: number;
  height: number;
  credit: string;
  date: string;
  note: string | null;
}

export const COMMUNITY_PHOTOS: CommunityPhoto[] = '''
tail='''

export function photosFor(...sections: string[]): CommunityPhoto[] {
  const list = COMMUNITY_PHOTOS.filter((p) => sections.includes(p.section));
  return [...list.filter((p) => p.featured), ...list.filter((p) => !p.featured)];
}
'''
open(f'{REPO}/lib/content/community-photos.ts','w',encoding='utf-8',newline='\n').write(head+json.dumps(out,ensure_ascii=False,indent=1)+';'+tail)
print('kept',len(out),'excluded',len(skipped),'uncaptioned',len(missing))
import os
for f,_ in skipped:
    p=f"{REPO}/public/photos/community/{f}"
    if os.path.exists(p): os.remove(p)
from collections import Counter
print(Counter(o['section'] for o in out))
