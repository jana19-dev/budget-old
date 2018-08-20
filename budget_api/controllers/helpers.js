export function findByIdCallback (res, error, object, id=null, name='Resource') {
  if (error)
    return res.status(404).json({ error: error.message });
  else if (!object)
    return res.status(404).json({ error: `${name} with id ${id} was not found` });
  else
    return res.status(200).json({...object['_doc']});
}
