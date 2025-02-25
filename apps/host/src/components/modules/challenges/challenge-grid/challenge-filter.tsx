import CustomSelect from '@/components/common/multi-select/multi-select';
import { Link } from 'react-router-dom';
import styles from './challenge-grid.module.scss';
import { useMemo } from 'react';
import { contributors } from '@fmc/data/content';
import { ETag, OptionType } from '@fmc/data/types';
import { Difficulties } from '@fmc/data/constants';
import { Search } from 'lucide-react';
import CustomCheckbox from '@/components/common/checkbox/checkbox';

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  links: { tech: string; imgSrc: string; active: boolean }[];
  optionSelected: OptionType[] | [];
  setOptionSelected: React.Dispatch<React.SetStateAction<OptionType[] | []>>;
  selectedDifficulties: OptionType[] | [];
  setSelectedDifficulties: React.Dispatch<React.SetStateAction<OptionType[] | []>>;
  setSelectedChallengesByTags: React.Dispatch<React.SetStateAction<ETag[] | []>>;
  isSegmentBtn1: boolean;
  setIsSegmentBtn1: React.Dispatch<React.SetStateAction<boolean>>;
  setNewChallenge: React.Dispatch<React.SetStateAction<boolean>>;
  newChallenge: boolean;
}

const ChallengeFilters = ({
  searchInput,
  setSearchInput,
  optionSelected,
  setOptionSelected,
  selectedDifficulties,
  setSelectedDifficulties,
  links,
  setSelectedChallengesByTags,
  isSegmentBtn1,
  setIsSegmentBtn1,
  setNewChallenge,
  newChallenge,
}: Props) => {
  const DeveloperList = useMemo(() => {
    const developerList = new Map();
    for (const [key, value] of contributors) {
      developerList.set(key, value);
    }

    const data: { value: string; label: string }[] = [];
    developerList.forEach((value, key) => {
      if (key !== '' && value?.name !== '') {
        data.push({ value: key, label: value?.name });
      }
    });
    return data;
  }, []);
  return (
    <div className={styles.filterOptionWrapper}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          name="searchTextInput"
          placeholder="Search challenge..."
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.trim())}
        />

        <Search size={15} className={styles.searchIcon} />
      </div>

      <CustomSelect
        data={DeveloperList}
        optionSelected={optionSelected}
        setOptionSelected={(val: OptionType[]) => setOptionSelected(val)}
      />

      <CustomSelect
        data={Difficulties}
        optionSelected={selectedDifficulties}
        setOptionSelected={(val: OptionType[]) => setSelectedDifficulties(val)}
      />
      <CustomCheckbox
        className={styles.checkbox}
        checked={newChallenge}
        setNewChallenge={setNewChallenge}
        label="New Challenges"
        containerClass={styles.checkboxContainer}
      />
      <div className={styles.customSegment}>
        <button
          data-active={isSegmentBtn1 ? true : false}
          className={styles.segmentBtn1}
          onClick={() => {
            setIsSegmentBtn1(true);
            setSelectedChallengesByTags([ETag.interview]);
          }}
        >
          Interview
        </button>
        <button
          data-active={!isSegmentBtn1 ? true : false}
          className={styles.segmentBtn2}
          onClick={() => {
            setIsSegmentBtn1(false);
            setSelectedChallengesByTags([ETag.all]);
          }}
        >
          All
        </button>
      </div>
      <div className={styles.filterByTechWrapper}>
        {links.map((link) => (
          <Link to={`/${link.tech}`} key={link.tech}>
            <img
              src={link.imgSrc}
              width={35}
              height={35}
              className={link.active ? styles.activeTech : ''}
              alt={`filter by ${link.tech}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChallengeFilters;
