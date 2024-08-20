// src/pages/components/IndexNavigation.tsx
import React, { useEffect, useState } from 'react';

interface Asset {
  id: string;
  content_metadata_name: string;
}

interface Index {
  id: number;
  name: string;
  description: string;
  public: boolean;
  assets: Asset[];
}

interface IndexNavigationProps {
  createIndex: (name: string, description: string, isPublic: boolean, assetIds: string[]) => void;
  assets: Asset[];
  ownerAddress: string;
  onFilterChange: (filter: string) => void;
}

const IndexNavigation: React.FC<IndexNavigationProps> = ({ createIndex, assets, ownerAddress, onFilterChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [userIndexes, setUserIndexes] = useState<Index[]>([]);

  const defaultIndexes = ['Long', 'Short', 'Trash'];

  useEffect(() => {
    const fetchUserIndexes = async () => {
      try {
        const response = await fetch(`/api/manage-index?ownerAddress=${ownerAddress}`);
        const indexes = await response.json();
        setUserIndexes(indexes);
      } catch (error) {
        console.error('Error fetching user indexes:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    fetchUserIndexes();
  }, [ownerAddress]);

  const getIndexAssetCount = (indexName: string) => {
    const index = userIndexes.find((index) => index.name === indexName);
    return index ? index.assets.length : 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createIndex(name, description, isPublic, selectedAssets);
    setName('');
    setDescription('');
    setIsPublic(false);
    setSelectedAssets([]);
    setShowModal(false);
  };


  return (
    <div>
      <button className="btn btn-sm btn-neutral" onClick={() => setShowModal(true)}>
        Create Index
      </button>

      <div className='space-x-2'>
        <button className="btn btn-sm btn-neutral" onClick={() => onFilterChange('all')}>
          All
        </button>
        {defaultIndexes.map((indexName) => (
          <button
            key={indexName}
            className="btn btn-sm btn-neutral"
            onClick={() => onFilterChange(indexName.toLowerCase())}
          >
            {indexName}
            <div className="badge">{getIndexAssetCount(indexName)}</div>
          </button>
        ))}

        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-neutral m-1">My Indexes</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {userIndexes.map((index) => (
              <li key={index.id}>
                <a onClick={() => onFilterChange(`index-${index.id}`)}>{index.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Create Index Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box border border-neutral">
            <h3 className="font-bold text-lg">Create Index</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Index Name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Public</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </label>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Assets</span>
                </label>
                <select
                  className="select select-bordered"
                  multiple
                  value={selectedAssets}
                  onChange={(e) => setSelectedAssets(Array.from(e.target.selectedOptions, (option) => option.value))}
                >
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.content_metadata_name}
                    </option>
                  ))}
                </select>
              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexNavigation;
