function Number({ value, current }) {
    const colors = {
      '-9': 'bg-orange-900 text-white',
      '-8': 'bg-orange-800 text-white',
      '-7': 'bg-orange-700 text-white',
      '-6': 'bg-orange-600 text-white',
      '-5': 'bg-orange-500 text-white',
      '-4': 'bg-orange-400',      
      '-3': 'bg-orange-300',
      '-2': 'bg-orange-200',
      '-1': 'bg-orange-100',
      '0':  'bg-white',
      '1':  'bg-blue-100',
      '2':  'bg-blue-200',
      '3':  'bg-blue-300',
      '4':  'bg-blue-400',
      '5':  'bg-blue-500 text-white',
      '6':  'bg-blue-600 text-white',
      '7':  'bg-blue-700 text-white',
      '8':  'bg-blue-800 text-white',
      '9':  'bg-blue-900 text-white'
    }
    const currentColor = colors[value.toString()]
    return (
      <div className={`number ${currentColor} w-8 h-8 flex justify-center items-center border border-gray-300`}>
        {value}
      </div>
    )
  }

export default Number;