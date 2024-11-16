import React from 'react';

interface FormatButtonsProps {
    appendTag: (tag: string) => void;
}

const FormatButtons: React.FC<FormatButtonsProps> = ({ appendTag }) => {
    const buttons = [
        { label: '[i]', tag: 'i' },
        { label: '[strong]', tag: 'strong' },
        { label: '[code]', tag: 'code' },
        { label: '[a]', tag: 'a href="#"' },
    ];

    return (
        <div className="flex space-x-2 mb-2">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => appendTag(button.tag)}
                    className="px-2 py-1 border rounded hover:bg-gray-100 focus:outline-none"
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default FormatButtons;
